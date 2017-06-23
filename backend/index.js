import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'

import executableSchema from './graphql'
import config from './utils/config'

const app = express()
const port = process.env.PORT || 3000

// Mongoose connection
mongoose.Promise = require('bluebird')
mongoose.connect(config.mdbl)
const db = mongoose.connection
db.on('error', () => console.log('Failed to connect to database.'))
	.once('open', () => console.log('Connected to database.'))

app.get('/', (req, res) => {
	res.send('This is main entry point.')
})

// Graphql Server to use in Client side
app.use('/graphql', bodyParser.json(), graphqlExpress({
	graphiql: true,
	pretty: true,
	schema: executableSchema
}))

// Graphiql for debugging in server side
app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql'
}))

app.listen(port, () => {
	console.log(`Server listening to port ${port}`)
})
