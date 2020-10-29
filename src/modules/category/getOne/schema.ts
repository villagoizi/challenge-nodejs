import { gql } from "apollo-server-express";

export const schema = gql`
    extend type Query {
        getOneCategory(id: ID!): Category!
    }
`