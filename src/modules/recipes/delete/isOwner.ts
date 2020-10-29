import { skip } from "graphql-resolvers"
import { getRepository } from "typeorm"
import { Recipe } from "../../../entity"
import { Context } from "../../../utils/typesGlobal"

export const isOwner = async (
    _:any,
    { id }: {id: number},
    { userId } : Context
    ) => {
        const recipeRepo = getRepository(Recipe)
        const isOwner = await recipeRepo.createQueryBuilder('r')
                                    .leftJoinAndSelect("r.user", "user")
                                    .where("r.id = :id AND user.id = :userId", { id, userId })
                                    .getOne()
        if(!isOwner) {
            throw new Error('Not authorized to modify or delete this resource')
        }
        return skip
    }