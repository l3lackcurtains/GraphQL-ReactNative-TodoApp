import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { ApolloProvider } from 'react-apollo'

import Todos from './todos'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://192.168.1.102:3000/graphql',
  }),
})

class TodoApp extends Component {
	render() {
		return(
			<ApolloProvider client={client}>
				<Todos />
			</ApolloProvider>
		)
	}
}

export default TodoApp