import { gql } from "apollo-server-express";


export const schema = gql`
    extend type Mutation {
        deleteRecipe( id: ID!): Recipe!
    }
`