import { gql } from "apollo-server-express";

export const schema = gql`
    extend type Mutation {
        updateCategory(id: ID!,name: String!): Category!
    }
`