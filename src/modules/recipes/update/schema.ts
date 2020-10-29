import { gql } from "apollo-server-express";


export const schema = gql`
    extend type Mutation {
        updateRecipe(id: ID, data: URecipe ): Recipe!
    }
    
    input URecipe {
        name: String
        description: String
        ingredients: [String!]
        category: ID
    }
`