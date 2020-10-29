import {gql} from 'apollo-server-express'

export const schema = gql`
    extend type Query {
        getCategories(query: Filters): ListCategory
    }
    input Filters {
        search: String
        limit: Int
        page: Int
    }
    type ListCategory {
        categories: [Category!]
        page: Int
        limit: Int
        nextPage: Int
    }
`