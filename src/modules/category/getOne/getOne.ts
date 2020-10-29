import { getRepository } from "typeorm";
import { Category } from "../../../entity";


export const getOne = async(_:any, { id } : {id:number}): Promise<Category> => {
    const categoryRepo = getRepository(Category)
    const one = await categoryRepo.createQueryBuilder('c')
                    .where('c.id = :id', { id })
                    .getOne()
    if(!one) {
        throw new Error('Category not found')
    }
    return one;
}