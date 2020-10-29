interface SearchRecipes {
    category?: string
    ingredients?: string[]
    name?: string
    page?: number
    limit?: number
}

export type Query = {
    query: SearchRecipes
}