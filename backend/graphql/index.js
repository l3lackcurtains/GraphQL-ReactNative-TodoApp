import { makeExecutableSchema } from 'graphql-tools'

import Schema from './schema'
import Resolvers from './resolvers'

const executableSchema = makeExecutableSchema({
	typeDefs: Schema,
	resolvers: Resolvers
})

export default executableSchema