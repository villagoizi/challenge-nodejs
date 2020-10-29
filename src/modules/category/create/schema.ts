import {gql} from 'apollo-server-express'

export const schema = gql`
    extend type Mutation {
        createCategory(name: String): Category!
    }

    type Category {
        id: ID!
        name: String!
    }
`