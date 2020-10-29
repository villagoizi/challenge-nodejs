import { getRepository } from "typeorm"
import { Query } from '../getAll/types'
import { ResponsePagination } from '../../../utils/typesGlobal'
import { Recipe } from "../../../entity"
import { Context } from "../../../utils/typesGlobal"
import { Pagination } from "../../../utils/pagination"

export const myRecipes = async ( 
    _: any,
    {query}: Query,
    { userId }: Context
    ): Promise<ResponsePagination<Recipe> | []> => {
        const recipesRepo = getRepository(Recipe)
        let qb = recipesRepo.createQueryBuilder('r').innerJoinAndSelect("r.user","user")
        qb = qb.where('user.id = :userId', { userId })
        const {name, ingredients, category} = query
        if(name) {
             qb = qb.andWhere("r.name ILIKE :recipeSearch", {recipeSearch: `%${name}%`})
         }
         if(category) {
             qb = qb.leftJoinAndSelect("r.category", "category")
                 .andWhere("category.name ILIKE :search", {search: `%${category}%`})
         }
         if(ingredients) {
                qb = qb.andWhere("r.ingredients && :ingredients", {ingredients})
         }
        const s = new Pagination<Recipe>()
        const all = await s.pagination(query.limit, query.page, qb,'r')
        const res: ResponsePagination<Recipe> = s.detailsPagination(all, query.limit, query.page, "recipes")
        return res ? res : []
}