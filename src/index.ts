import * as dotenv from 'dotenv'
dotenv.config()
import {ApolloServer} from 'apollo-server-express'
import express from 'express'
import { genSchema } from './utils/genSchema'
import cors from 'cors'
import {createConnection} from 'typeorm'
import { GraphQLSchema } from 'graphql'
import { verifyJWT } from './security/auth'
import { Context } from './utils/typesGlobal'
const PORT = process.env.PORT || 5000

async function main () {
    await createConnection()
    const schema: GraphQLSchema = genSchema()
    const app : express.Application = express()
    app.use(cors())
    app.use(express.json())
    const server: ApolloServer = new ApolloServer({
        schema,
        context: async ({req, res}: Context) => {
            await verifyJWT(req)
            return {
                userId: req.userId,
                req,
                res
            }
        }
    })
    server.applyMiddleware({app, path: '/api'})
    app.listen(PORT, () => console.log(`Graphql API run http://localhost:${PORT}/api`))
}
main()