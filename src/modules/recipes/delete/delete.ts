import { DeleteResult, getRepository } from "typeorm"
import { Recipe } from "../../../entity"


export const deleteRecipe = async (_:any, { id }: { id: number }): Promise<Recipe> => {
    const recipeRepo = getRepository(Recipe)
    const removeRecipe: DeleteResult = await recipeRepo.createQueryBuilder('r')
                            .delete()
                            .from(Recipe)
                            .where('r.id = :id', { id })
                            .returning("*")
                            .execute()
    const recipe: Recipe = removeRecipe.raw[0]
    return recipe;
}