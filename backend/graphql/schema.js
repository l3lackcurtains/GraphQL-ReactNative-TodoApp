const typeDefinitions = `
	type Todo {
		_id: String!
		text: String
		done: Boolean
	}
	
	# Query Schemas
	type Query {
		todos: [Todo]
	}

	# Mutation Schemas
	type Mutation {
		addTodo(
			text: String
		): Todo

		deleteTodo(
			id: String
		): Todo

		updateTodo(
			id: String,
			text: String
			done: Boolean
		): Todo
	}

	# Root Query and Mutations into one
	schema {
		query: Query
		mutation: Mutation
	}
`

export default [typeDefinitions]