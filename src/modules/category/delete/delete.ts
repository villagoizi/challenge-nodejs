import { DeleteResult, getRepository } from "typeorm";
import { Category } from "../../../entity";


export const deleteCategory = async(_:any, { id } : {id:number}): Promise<Category> => {
    const categoryRepo = getRepository(Category)
    const qb =  categoryRepo.createQueryBuilder('c')
    const one = await qb
                    .where('c.id = :id', { id })
                    .getOne()
    if(!one) {
        throw new Error('Category not found')
    }
    const d: DeleteResult = await qb
                        .delete()
                        .from(Category)
                        .where('id = :id', {id})
                        .returning("*")
                        .execute()
    const category = d.raw[0]
    return category;
}