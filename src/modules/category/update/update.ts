import { getRepository, UpdateResult } from 'typeorm'
import { Category } from '../../../entity'

export const updateCategory = async (_:any, {id, name} : CategoryData): Promise<Category> => {
    const categoryRepo = getRepository(Category)
    const qb = categoryRepo.createQueryBuilder('c')
    const exist: Category | undefined = await qb.where("c.id = :id",{id}).getOne()
    if(!exist) {
        throw new Error('Category not found')
    }
    const update: UpdateResult = await qb
                        .update(Category)
                        .set({name})
                        .where("id = :id",{id})
                        .returning("*")
                        .execute()
    const category: Category = update.raw[0]
    return category;
}

export type CategoryData = {
    id: number
    name: string
}