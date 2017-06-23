import mongoose from 'mongoose'

const Schema = mongoose.Schema

const todoSchema = new Schema({
	text: {
		type: String,
	},
	done: {
		type: Boolean,
		default: false
	}
}, { collection: 'todo', timestamps: true })

const Todo = mongoose.model('todo', todoSchema)

export default Todo
