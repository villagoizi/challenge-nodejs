export interface Query {
    query: Filters
}

export interface Filters {
    search?: string
    limit?: number
    page?: number
}