import { getRepository } from "typeorm";
import { Recipe } from "../../../entity";

export const category = async (Parent:Recipe) => {
    return await getRepository(Recipe).createQueryBuilder().relation(Recipe, "category").of(Parent).loadOne()
}