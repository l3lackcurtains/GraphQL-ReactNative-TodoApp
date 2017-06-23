import Todo from '../models/todo'

const Resolvers = {
	Query: {
		// Fetch all crops
		todos() {
			const todos = Todo.find().exec()
			if (!todos) throw new Error('Error Fetching todos')
			return todos
		}
	},
	Mutation: {
		// Add a new crop
		addTodo(_, { text }) {
			const todoModel = new Todo({ text })
			const newTodo = todoModel.save()
			if (!newTodo) throw new Error('Error Adding new Todo')
			return newTodo
		},
		deleteTodo(_, { id }) {
			const removedTodo = Todo.findByIdAndRemove(id).exec()
			if (!removedTodo) {
				throw new Error('Error removing blog post')
			}
			return removedTodo
		},
		updateTodo(_, { id, text, done }) {
			const updatedTodo = Todo.findByIdAndUpdate(
				id,
				{ $set: { text, done } },
				{ new: true }
			)
			if (!updatedTodo) {
				throw new Error('Error removing blog post')
			}
			return updatedTodo
		}
	}
}

export default Resolvers