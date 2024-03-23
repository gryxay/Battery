const express = require('express');
const router = express.Router();
const db = require('../models/index');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images'); // Specify the directory to save the uploaded files
    },
    filename: function (req, file, cb) {
        // Generate a unique filename to avoid overwriting existing files
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({ storage: storage });

//upload new item
router.post('/items', upload.array('images', 5), async (req, res) => {
    try {
        // Get form data from req.body
        const { name, category, price, amount, code, details } = req.body;

        // Validate required fields
        if (!name || !category || !price || !amount || !req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Name, category, price, amount, and at least one image are required' });
        }

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
                const imagePath = file.filename;
                
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

        res.status(201).json({ message: 'Item created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
});

//fetch all items
router.get('/getitems', async (req, res) => {
    try {
        // Fetch all items from the database
        const items = await db.Item.findAll({
            include: [db.Image]
        });

        // Map items to return image paths instead of binary data
        const itemsWithImages = await Promise.all(items.map(async item => {
            const images = await Promise.all(item.images.map(async image => {
                const imagePath = path.join(__dirname, '..', 'images', image.location);
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
            const imagePath = path.join(__dirname, '..', 'images', image.location);
            const imageBinary = fs.readFileSync(imagePath);
            return {
                filename: image.location,
                data: Buffer.from(imageBinary).toString('base64')
            };
        }));

        // Return the item with images and details as JSON response
        res.status(200).json({
            id: item.id,
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
        const { name, category, price, amount, code, details, imagesToDelete } = req.body;

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
            // Code to update details
        }

        // Upload additional images if they exist
        const createdImages = [];
        for (const file of req.files) {
            try {
                // Store the path of the uploaded image
                const imagePath = file.filename;
                
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

        if (imagesToDelete && imagesToDelete.length > 0) {
            for (const filename of imagesToDelete) {
                // Find the image with the matching filename
                const imageToDelete = itemToUpdate.images.find(image => image.location === filename);
                if (imageToDelete) {
                    // Delete the image from the database
                    await db.Image.destroy({ where: { id: imageToDelete.id } });
        
                    // Remove the image file from its location on the disk
                    const imagePath = path.join(__dirname, '..', 'images', filename);
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
        const itemToDelete = await db.Item.findByPk(itemId);

        // Check if the item exists
        if (!itemToDelete) {
            return res.status(404).json({ message: 'Item not found' });
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
