import { getRepository } from "typeorm"
import { Category, Recipe } from "../../../entity"
import {Data} from './types'


export const updateRecipe = async (
    _:any, 
    { id, data }: Data
    ): Promise<Recipe> => {
        const { category, ...values } = data
        const recipeRepo = getRepository(Recipe)
        const qb = recipeRepo.createQueryBuilder('r')
        const isExist = await qb.where('r.id = :id', { id })
                                .getOne()
        if(!isExist) {
            throw new Error('Recipe not found')
        }
        if(category) {
            const isExistCategory = await getRepository(Category).findOne(category)
            if(!isExistCategory) {
                throw new Error('Category not found')
            }
            await recipeRepo.createQueryBuilder()
                            .relation(Recipe ,"category")
                            .of(isExist)
                            .set(isExistCategory)
        }
        if(Object.keys(values).length ) {
            const update = await qb.update(Recipe)
                                    .set({...values})
                                    .where("id = :id", { id })
                                    .returning("*")
                                    .execute()
            return update.raw[0]
        }
        const recipe = await qb.where('r.id = :id', { id })
                                .getOne()
        return recipe!
}