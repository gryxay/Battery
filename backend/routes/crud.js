const express = require('express');
const router = express.Router();
const db = require('../models/index');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/tmp'); // Save temporary files in /images/tmp
    },
    filename: function (req, file, cb) {
        // Generate a unique filename to avoid overwriting existing files
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({ storage: storage });

// Function to move files from source to destination
function moveFiles(sourceDir, destDir) {
    fs.readdir(sourceDir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const source = path.join(sourceDir, file);
            const destination = path.join(destDir, file);
            fs.renameSync(source, destination);
        });
    });
}

// Function to clean up temporary files
function cleanUpTmpFiles(tmpDir) {
    fs.readdir(tmpDir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const filePath = path.join(tmpDir, file);
            fs.unlinkSync(filePath);
        });
    });
}

// Function to delete temporary files in a directory
function deleteTemporaryFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });
}

//upload new item
router.post('/items', upload.array('images', 5), async (req, res) => {
    try {
        // Get form data from req.body
        const { name, category, price, amount, code, details } = req.body;

        // Validate required fields
        if (!name || !category || !price || !amount || !req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Name, category, price, amount, and at least one image are required' });
        }

        // Move files from tmp to uploaded directory
        moveFiles('./images/tmp', './images/uploaded');

        // Create the item
        const newItem = await db.Item.create({
            name,
            category,
            code,
            price,
            amount
        });

        // Create images for the item and store their paths in the database
        const createdImages = [];
        for (const file of req.files) {
            try {
                // Store the path of the uploaded image
                const imagePath = path.join('uploaded', file.filename); // Store relative path from /images directory
                
                // Create image entry in the database with the image path
                const newImage = await db.Image.create({ location: imagePath, type: file.mimetype });
                createdImages.push(newImage);
            } catch (error) {
                console.error('Error creating image entry:', error);
                return res.status(500).json({ message: 'Error creating image entry' });
            }
        }

        // Associate images with the item
        await newItem.setImages(createdImages);

        // Create details for the item if details object exists
        if (details) {
            const newDetails = await db.Details.create({
                manufacturer: details.manufacturer,
                weight: details.weight,
                comment: details.comment,
                measurements: details.measurements,
                packaging: details.packaging
            });

            // Associate details with the item
            await newItem.setDetail(newDetails);
        }

        // Clean up temporary files in /images/tmp
        cleanUpTmpFiles('./images/tmp');

        res.status(201).json({ message: 'Item created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
});

//fetch all items or by category
router.get('/getitems/:category?', async (req, res) => {
    try {
        // Fetch all items from the database

        let items;

        if (req.params.category) {
            items = await db.Item.findAll({
                include: [db.Image],
                where: {category: req.params.category}
            });    
        } else {
            items = await db.Item.findAll({
                include: [db.Image],
            });
    
        }
        // Map items to return image paths instead of binary data
        const itemsWithImages = await Promise.all(items.map(async item => {
            const images = await Promise.all(item.images.map(async image => {
                const imagePath = path.join(__dirname, '../images/', '', image.location);
                const imageBinary = fs.readFileSync(imagePath);
                return {
                    filename: image.location,
                    data: Buffer.from(imageBinary).toString('base64')
                };
            }));
            return {
                ...item.toJSON(),
                images: images
            };
        }));

        res.status(200).json(itemsWithImages); // Send items with images as JSON response
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


//fetch item by id
router.get('/items/:id', async (req, res) => {
    try {
        // Fetch the item with the specified ID from the database
        const itemId = req.params.id;
        const item = await db.Item.findByPk(itemId, {
            include: [
                { model: db.Image },
                { model: db.Details } // Include the Details model here
            ]
        });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Map the fetched item to return image paths instead of binary data
        const images = await Promise.all(item.images.map(async image => {
            const imagePath = path.join(__dirname, '../images', '', image.location);
            const imageBinary = fs.readFileSync(imagePath);
            return {
                filename: image.location,
                data: Buffer.from(imageBinary).toString('base64')
            };
        }));

        // Return the item with images and details as JSON response
        res.status(200).json({
            id: item.id,
            category: item.category,
            name: item.name,
            code: item.code,
            price: item.price,
            amount: item.amount,
            details: {
                weight: item.detail.weight ? item.detail.weight : '',
                manufacturer: item.detail.manufacturer ? item.detail.manufacturer : '',
                comment: item.detail.comment ? item.detail.comment : '',
                measurements: item.detail.measurements ? item.detail.measurements : '',
                packaging: item.detail.packaging ? item.detail.packaging : ''
            },
            images: images
        });
    } catch (error) {
        console.error('Error retrieving item:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update item with a specific ID
router.put('/update/:id', upload.array('additionalImages', 5), async (req, res) => {
    try {
        // Get item ID from request parameters
        const itemId = req.params.id;

        // Find the item in the database
        const itemToUpdate = await db.Item.findByPk(itemId, {
            include: [db.Image]
        });


        // Check if the item exists
        if (!itemToUpdate) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Extract updated item data from request body
        console.log(req.body)
        const { name, category, price, amount, code, details, imagesToDelete } = req.body;
        console.log('/n/n/n/n')
        console.log(name)
        console.log('/n/n/n/n')

        // Update the item attributes if provided
        if (name) itemToUpdate.name = name;
        if (category) itemToUpdate.category = category;
        if (price) itemToUpdate.price = price;
        if (amount) itemToUpdate.amount = amount;
        if (code) itemToUpdate.code = code;

        // Update the item in the database
        await itemToUpdate.save();

        // If details are provided, update them
        if (details) {
            // Find or create details associated with the item
            let itemDetails = await db.Details.findOne({ where: { itemId: itemId } });
            if (!itemDetails) {
                itemDetails = await db.Details.create({
                    manufacturer: details.manufacturer,
                    weight: details.weight,
                    comment: details.comment,
                    measurements: details.measurements,
                    packaging: details.packaging,
                    itemId: itemId // Associate details with the item
                });
            } else {
                // Update existing details
                if (details.manufacturer) itemDetails.manufacturer = details.manufacturer;
                if (details.weight) itemDetails.weight = details.weight;
                if (details.comment) itemDetails.comment = details.comment;
                if (details.measurements) itemDetails.measurements = details.measurements;
                if (details.packaging) itemDetails.packaging = details.packaging;
                await itemDetails.save();
            }
        }

        const createdImages = [];
        for (const file of req.files) {
            try {
                // Store the path of the uploaded image
                const imagePath = path.join('uploaded', file.filename); // Store relative path from /images directory

                // Move the uploaded image file from temporary directory to permanent directory
                const source = path.join('./images/tmp', file.filename);
                const destination = path.join('./images/uploaded', file.filename);
                fs.renameSync(source, destination);

                // Create image entry in the database with the image path
                const newImage = await db.Image.create({ location: imagePath, type: file.mimetype });
                createdImages.push(newImage);
            } catch (error) {
                console.error('Error creating image entry:', error);
                return res.status(500).json({ message: 'Error creating image entry' });
            }
        }

        const allImages = [...itemToUpdate.images, ...createdImages];

        // Associate all images with the item
        await itemToUpdate.setImages(allImages);

        let imagesToDeleteArr = [imagesToDelete].flat();
        console.log(typeof(imagesToDeleteArr))

        console.log(imagesToDeleteArr)

        
        if (imagesToDeleteArr && imagesToDeleteArr.length > 0) {
            for (const filename of imagesToDeleteArr) {
                // Find the image with the matching filename
                const imageToDelete = itemToUpdate.images.find(image => image.location == filename);
                if (imageToDelete) {
                    // Delete the image from the database
                    await db.Image.destroy({ where: { id: imageToDelete.id } });

                    // Remove the image file from its location on the disk
                    const imagePath = path.join(__dirname, '../images', '', filename);
                    fs.unlinkSync(imagePath);

                    // Remove the association between the deleted image and the item
                    await itemToUpdate.removeImage(imageToDelete);
                }
            }
        }

        res.status(200).json({ message: 'Item updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
});

// Delete item with a specific ID
router.delete('/delete/:id', async (req, res) => {
    try {
        // Get item ID from request parameters
        const itemId = req.params.id;

        // Find the item in the database
        const itemToDelete = await db.Item.findByPk(itemId, {
            include: [db.Image],
        });

        // Check if the item exists
        if (!itemToDelete) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Delete associated images and their files
        for (const image of itemToDelete.images) {
            const imagePath = path.join(__dirname, '../images', '', image.location);
            fs.unlinkSync(imagePath); // Delete the file from the disk
        }

        // Delete associated images
        await db.Image.destroy({ where: { itemId: itemId } });

        // Delete associated details
        await db.Details.destroy({ where: { itemId: itemId } });

        // Delete the item
        await itemToDelete.destroy();

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
});


module.exports = router;
