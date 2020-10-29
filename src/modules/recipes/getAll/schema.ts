import { gql } from "apollo-server-express";


export const schema = gql`
    extend type Query {
        getRecipes(query: SearchRecipes): ListRecipes!
    }

    input SearchRecipes {
        category: String
        ingredients: [String!]
        name: String
        page: Int
        limit: Int
    }
    
    type ListRecipes {
        recipes: [Recipe!]
        page: Int
        limit: Int
        nextPage: Int
    }
`