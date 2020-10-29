import { SelectQueryBuilder } from "typeorm"
import { ResponsePagination } from "./typesGlobal"


export class Pagination<Entity> {
    async pagination(limit=10,page=1, qb: SelectQueryBuilder<Entity>, alias: string ): Promise<Entity[]> {
        const skip = (limit * page) - limit
        const all = await qb
            .orderBy(`${alias}.id`, "DESC")
            .take(limit + 1)
            .skip(skip)
            .getMany()
        // console.log(all)
        return all
    }

    detailsPagination(entities: Entity[], limit=10, page=1, e:string): ResponsePagination<Entity> {
        const nextPage = entities.length > limit ? page + 1 : null
        const listEntities: Entity[] = typeof nextPage === 'number' ? entities.splice(0, -1) : entities.splice(0, entities.length)
        let res: ResponsePagination<Entity> = {
            limit,
            page,
            nextPage
        }
        if(e == 'categories' || e == 'recipes') {
            res[e] = listEntities ? listEntities : []
        }
        return res;

    }
    async totalPages(limit=10, qb: SelectQueryBuilder<Entity>): Promise<number> {
        const t = await qb.getCount()
        const p = Math.round(t / limit)
        return p
    }
}