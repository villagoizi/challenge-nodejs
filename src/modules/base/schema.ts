import {gql} from 'apollo-server-express'

export const schema = gql`
    type Query {
        _: String
    }
    type Mutation {
        _: String
    }
`