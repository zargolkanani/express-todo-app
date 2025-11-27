const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.getUsers = async (req, res, next) => {
    res.success(User.getAll());
};

exports.createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({
            status: 400,
            message: 'Validation failed',
            details: errors.array()
        });
    }

    const { name, age } = req.body;
    const user = User.create({ name, age });
    res.success(user);
};

exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    const user = User.update(id, req.body);
    if (!user) {
        return next({ status: 404, message: 'User not found' });
    }
    res.success(user);
};

exports.deleteUser = async (req, res, next) => {
    User.delete(req.params.id);
    res.success({ message: 'User removed' });
};
