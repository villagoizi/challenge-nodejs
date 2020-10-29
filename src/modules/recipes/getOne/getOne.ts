import { getRepository } from "typeorm"
import { Recipe } from "../../../entity"

export const getOneRecipe = async (
    _:any,
    { id }: {id: number}
    ): Promise<Recipe>  => {
        const recipeRepo = getRepository(Recipe)
        const one: Recipe | undefined = await recipeRepo
                                                .createQueryBuilder('r')
                                                .where("r.id = :id", { id })
                                                .getOne()
        if(!one) {
            throw new Error('Recipe not found')
        }
        return one;
}