import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { List, ListItem, CheckBox, Header, Button, FormLabel, FormInput } from 'react-native-elements'
import Modal from 'react-native-modal'
import { gql, graphql, compose } from 'react-apollo'

class Todos extends Component {
	constructor(props){
		super(props)
		this.state = {
			isModalVisible: false,
			todoText: ''
		}
		this.updateTodoText = this.updateTodoText.bind(this)
	}
	showModal = () => this.setState({ isModalVisible: true })

	updateTodoText(val) {
		this.setState({
			todoText: val
		})
	}

	addNewTodo(text) {
		this.props.addTodo(text)
		this.setState({
			todoText: '',
			isModalVisible: false
		})
	}
	// Render the todolist
	render() {
		const { todos } = this.props.data
		return (
		<View style={{ flex: 1 }}>
			<View>
				<Header
					outerContainerStyles={{ backgroundColor: '#3D6DCC', height: 60 }}
				>	
					<Text style={{ color: '#fff', padding: 4 }}>TODO APP</Text>
					<View/>
					<Button
						title="ADD TODO" 
						onPress={() => this.showModal()}
						icon={{name: 'add'}}
						buttonStyle={{ padding: 8, marginVertical: -4, marginRight: -24, backgroundColor: '#3D8DDC' }}
					/>
				</Header>
			</View>
			<View>
				<List containerStyle={{marginTop: 58}}>
					{ !todos ? null : todos.map((todo, index) => {
						return(
						<ListItem
							key={index}
							title={
								<CheckBox
									title={todo.text}
									checked={todo.done}
									onPress={() => this.props.updateTodo(todo._id, todo.text, !todo.done)}
									containerStyle={{
										backgroundColor: '#fff',
										margin: -3,
										borderWidth: 0
									}}
									textStyle={{
										textDecorationLine: todo.done ? 'line-through' : 'none',
										color: todo.done ? '#bdbdbd' : '#191919'
									}}
								/>
							}
							rightIcon={{ name: 'close', style: { fontSize: 16, paddingVertical: 12 }}}
							onPressRightIcon={() => this.props.deleteTodo(todo._id)}
						/>
						)
					})}
				</List>
			</View>
			<Modal
				isVisible={this.state.isModalVisible}
				hideOnBack={true}
				style={{
					justifyContent: 'flex-end',
					margin: 0,
    			marginTop: 450,
					backgroundColor: '#fff',
				}}			
			>
				<View style={{ flex: 1, margin: 18 }}>
					<FormLabel>Todo Text</FormLabel>
					<FormInput 
						inputStyle={{ width: 350, marginVertical: 18 }}
						onChangeText={this.updateTodoText.bind(this)}
						value={this.state.todoText}
					/>
					<Button
						title="ADD"
						raised
						onPress={() => this.addNewTodo(this.state.todoText)}
						icon={{name: 'add'}}
						buttonStyle={{ backgroundColor: '#3D8DDC' }}
					/>
				</View>
			</Modal>
		</View>
		)
	}
}

const queryTodo = graphql(gql`
	query Todos{
		todos {
			_id
			text
			done
		}
	}
`)

addMutation = graphql(gql`
	mutation ($text: String!) {
		addTodo(text: $text) {
			text
			done
			_id
		}
	}
`, {
  props: ({ mutate }) => ({
    addTodo: (text) => mutate({ variables: { text } })
  }),
  options: {
    updateQueries: {
      Todos: (previousData, { mutationResult }) => {
        const newTodo = mutationResult.data.addTodo
        return {
					...previousData,
					todos: [...previousData.todos, newTodo],
				}
      },
    },
  }
})



deleteMutation = graphql(gql`
	mutation ($id: String!) {
		deleteTodo(id: $id) {
			_id
		}
	}
`, {
  props: ({ mutate }) => ({
    deleteTodo: (id) => mutate({ variables: { id } })
  }),
  options: {
    updateQueries: {
      Todos: (previousData, { mutationResult }) => {
        const deletedTodo = mutationResult.data.deleteTodo
        return {
					...previousData,
					todos: previousData.todos.filter((todo) => todo._id !== deletedTodo._id)
				}
      },
    },
  }
})



updateMutation = graphql(gql`
	mutation ($id: String!, $text: String!, $done: Boolean!) {
		updateTodo(id: $id, text: $text, done: $done) {
			_id
			text
			done
		}
	}
`, {
  props: ({ mutate }) => ({
    updateTodo: (id, text, done) => mutate({ variables: { id, text, done } })
  }),
  options: {
    updateQueries: {
      Todos: (previousData, { mutationResult }) => {
        const updatedTodo = mutationResult.data.updateTodo
				updatedTodos = previousData.todos.map((todo) => todo._id === updatedTodo._id ? updatedTodo : todo)
        return {
					...previousData,
					todos: updatedTodos
				}
      },
    },
  }
})

export default compose(
  queryTodo,
  addMutation,
  deleteMutation,
	updateMutation
)(Todos)
