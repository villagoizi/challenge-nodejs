import { getRepository, InsertResult } from 'typeorm'
import { Category } from '../../../entity'
import { CategoryData } from './types'

export const createCategory = async (_:any, {name} : CategoryData): Promise<Category | void> => {
        const categoryRepo = getRepository(Category)
        const create: InsertResult = await categoryRepo
                            .createQueryBuilder()
                            .insert()
                            .into(Category)
                            .values({name: name})
                            .returning("*")
                            .execute()
        const category: Category = create.raw[0]
        return category;
}