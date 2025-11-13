const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let todos = [];
let id = 1;

// گرفتن لیست کارها
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// افزودن کار جدید
app.post('/api/todos', (req, res) => {
    const todo = { id: id++, text: req.body.text, done: false };
    todos.push(todo);
    res.status(201).json(todo);
});

// تغییر وضعیت یا ویرایش متن
app.put('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id == req.params.id);
    if (!todo) return res.status(404).send('Not found');

    if (req.body.text !== undefined) todo.text = req.body.text;
    else todo.done = !todo.done;

    res.json(todo);
});

// حذف کار
app.delete('/api/todos/:id', (req, res) => {
    todos = todos.filter(t => t.id != req.params.id);
    res.status(204).end();
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
