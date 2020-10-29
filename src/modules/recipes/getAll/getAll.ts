import { Query } from "./types";
import { Pagination } from '../../../utils/pagination'
import { getRepository } from "typeorm";
import { Recipe } from '../../../entity'
import { ResponsePagination } from "../../../utils/typesGlobal";

export const getRecipes = async ( 
    _: any,
    {query}: Query
    ): Promise<ResponsePagination<Recipe> | []> => {
        const recipesRepo = getRepository(Recipe)
        let qb = recipesRepo.createQueryBuilder('r')
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
        const all = await s.pagination(query.limit, query.page, qb, 'r')
        const res: ResponsePagination<Recipe> = s.detailsPagination(all, query.limit, query.page, "recipes")
        return res
}