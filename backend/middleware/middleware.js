const { check } = require('express-validator');
const pathsArray = require('./paths')

const validateNewItem = [
    // Check if name is provided and is a string
    check('name').isString().notEmpty().isLength({ min: 3, max: 60 }).trim().escape(),

    // Check if category is provided and is a string
    check('category').isString().notEmpty().isLength({ min: 3, max: 50 }).trim().escape(),

    // Check if price is provided and is a float number
    check('price').isFloat({ min: 0 }),

    // Check if amount is provided and is an integer
    check('amount').isInt({ min: 0 }),

    // Check if code is provided and is a string
    check('code').isString().notEmpty().isLength({ min: 3, max: 50 }).trim().escape(),

    // Validate details
    check('details').optional().isObject().custom(async (details, { req }) => {
        // If details are provided, validate each field
        if (details) {
        await Promise.all([
            check('details.manufacturer').isString().notEmpty().isLength({ max: 100 }).trim().escape().run(req),
            check('details.weight').optional().isString().isLength({ max: 20 }).trim().escape().run(req),
            check('details.comment').optional().isString().run(req),
            check('details.measurements').optional().isString().isLength({ max: 100 }).trim().escape().run(req),
            check('details.packaging').optional().isString().isLength({ max: 100 }).trim().escape().run(req),
        ]);
        }
        return true; // Return true to indicate success
    }),

    // Check if images have been uploaded (assuming `upload.array` middleware adds this to `req.files`)
    check('images').custom((value, { req }) => {
        if (!req.files || req.files.length === 0) {
        throw new Error('At least one image is required');
        }
        return true;
    }),
];

const validateCategory = [
    check('category').isString().notEmpty().isLength({ max: 50 }).isIn(pathsArray).trim().escape(),
]

const validateId = [
    check('id').isInt().notEmpty(),
]

const validateImages =[
    // Check if images have been uploaded (assuming `upload.array` middleware adds this to `req.files`)
    check('additionalImages').custom((value, { req }) => {
        if (!req.files || req.files.length === 0) {
        throw new Error('At least one image is required');
        }
        return true;
    }),
]

module.exports = {
    validateNewItem,
    validateCategory,
    validateId,
    validateImages,
}
