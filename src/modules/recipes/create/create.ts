import { getRepository, InsertResult } from "typeorm";
import {AuthenticationError} from 'apollo-server-express'
import { Category, Recipe, User } from "../../../entity";
import { Context } from "../../../utils/typesGlobal";
import {Data} from './types'


export const createRecipe = async (_:any, {data}:Data,{userId}:Context): Promise<Recipe> => {
    const category = await getRepository(Category).findOne(data.category)
    const user = await getRepository(User).findOne(userId!)
    if(!category) {
        throw new Error('Category invalid, it not found.')
    }
    if(!user) {
        throw new AuthenticationError('Not authenticated, please login before to create a recipe')
    }
    const recipeRepo = getRepository(Recipe)
    const qb = recipeRepo.createQueryBuilder('r')
    const create: InsertResult = await qb
                                        .insert()
                                        .into(Recipe)
                                        .values({
                                            name: data.name,
                                            ingredients: data.ingredients,
                                            description: data.description,
                                            user: user,
                                            category: category
                                        })
                                        .returning("*")
                                        .execute()
    const recipe: Recipe = create.raw[0]
    return recipe;
}