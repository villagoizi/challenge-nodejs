import {gql} from 'apollo-server-express'

export const schema = gql`
    extend type Mutation {
        signup(data: Register!): String!
    }

    input Register {
        name: String!
        email: String!
        password: String!
    }
    type User {
        id: ID!
        name: String!
        email: String!
    }
`