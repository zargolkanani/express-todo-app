const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const userController = require('../controllers/user');

// Validation rules
const validateUser = [
    body('name')
        .isString()
        .notEmpty()
        .withMessage("Name must be a non-empty string"),
    body('age')
        .isInt({ gt: 0 })
        .withMessage("Age must be a positive integer")
];

// Routes
router.get('/', userController.getUsers);

router.post('/', validateUser, userController.createUser);

router.put('/:id', validateUser, userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
