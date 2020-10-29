interface URecipe {
    name?: string
    description?: string
    ingredients?: string[]
    category?: number
}

export interface Data {
    data: URecipe
    id: number
}