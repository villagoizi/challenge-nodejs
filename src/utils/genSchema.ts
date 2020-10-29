import glob from 'glob'
import path from 'path'
import { IResolvers, makeExecutableSchema, mergeTypeDefs } from 'graphql-tools'
import { DocumentNode, GraphQLSchema } from 'graphql'
import { GQL } from './merge'

export const genSchema = (): GraphQLSchema => {
    const pathModule = path.join(__dirname, '../modules')
    const allResolvers: IResolvers[] = glob.sync(`${pathModule}/**/resolver.*s`).map(res => require(res).resolver)
    const allTypeDefs: DocumentNode[] = glob.sync(`${pathModule}/**/schema.*s`).map(x => require(x).schema )
    const resolvers = GQL.merge(allResolvers)
    const typeDefs = mergeTypeDefs(allTypeDefs)
    return makeExecutableSchema({
        typeDefs,
        resolvers
    })
}