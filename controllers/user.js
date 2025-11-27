let users = [];
let idCounter = 1;
const { validationResult } = require('express-validator');

exports.getUsers = (req, res) => res.json(users);

exports.createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: { message: "Validation failed", status: 400, details: errors.array() } });
  }
  const user = { id: idCounter++, name: req.body.name, age: req.body.age };
  users.push(user);
  res.status(201).json(user);
};

exports.updateUser = (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ success: false, error: { message: 'Not found', status: 404 } });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: { message: "Validation failed", status: 400, details: errors.array() } });
  }

  user.name = req.body.name;
  user.age = req.body.age;
  res.json(user);
};

exports.deleteUser = (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.status(204).end();
};
