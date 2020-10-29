import {gql} from 'apollo-server-express'

export const schema = gql`
    extend type Mutation {
        login(data: Login!): String
    }

    input Login {
        email: String!
        password: String!
    }
`