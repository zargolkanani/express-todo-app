const express = require('express');
const { body } = require('express-validator');
const { asyncHandler } = require('../middleware/asyncHandler');
const userController = require('../controllers/user');

const router = express.Router();

const validateUser = [
  body('name').isString().notEmpty().withMessage("Name must be a non-empty string"),
  body('age').isInt({ gt: 0 }).withMessage("Age must be a positive integer")
];

router.get('/', asyncHandler(userController.getUsers));
router.post('/', validateUser, asyncHandler(userController.createUser));
router.put('/:id', validateUser, asyncHandler(userController.updateUser));
router.delete('/:id', asyncHandler(userController.deleteUser));

module.exports = router;
