const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todo = require('./models/todo.js')

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const port = 3300;

const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString)
    .then(() => console.log('Connected to the database…'))
    .catch((err) => console.error('Connection error:', err));

app.get('/todo', async (req, res) => {
    const todos = await todo.find();
    res.json(todos);
});

app.post('/todo/new', async (req,res) => {
    const newTask = await todo.create(req.body);
    res.status(201).json({newTask});
})

app.delete('/todo/delete/:id', async(req,res)=>{
    const result = await todo.findByIdAndDelete(req.params.id);
    res.json(result);
})

app.put('/todo/update/:id', async (req, res) => {
    const update = await todo.findByIdAndUpdate(req.params.id, req.body);
    res.json(update);
})

app.put('/todo/edit/:id', async (req, res) => {
    const update = await todo.findByIdAndUpdate(req.params.id, req.body);
    res.json(update);
})

app.listen(port, () => console.log(`Server is running on port ${port}`)); 