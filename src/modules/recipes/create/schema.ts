import { gql } from "apollo-server-express";

export const schema = gql`
    extend type Mutation {
        createRecipe(data: CreateRecipe! ): Recipe!
    }

    input CreateRecipe {
        name: String
        description: String!
        ingredients: [String!]!
        category: ID!
    }
    type Recipe {
        id: ID!
        name: String!
        description: String!
        ingredients: [String!]!
        category: Category!
    }
`