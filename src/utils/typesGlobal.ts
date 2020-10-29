import {Request, Response} from 'express'

export interface Context {
    req: CustomContext
    res: Response
    userId: number | null
}
export interface CustomContext extends Request {
    userId: number | null
}

interface ResponseEntity<Entity>{
    [key: string]: Entity[];
}
// export type ResponsePagination<Entity> = ResponseEntity<Entity> & {
//     page: number
//     limit: number
//     nextPage: number | null
// }
export type ResponsePagination<Entity> = {
    categories?: Entity[] | []
    recipes?: Entity[] | []
    page: number
    limit: number
    nextPage: number | null
}