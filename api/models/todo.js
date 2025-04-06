const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        }
    }
)

const TodoModel = mongoose.model('tasks', toDoSchema);

module.exports = TodoModel;