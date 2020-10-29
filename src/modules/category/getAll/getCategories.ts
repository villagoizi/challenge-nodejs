import { getRepository } from 'typeorm'
import { Category } from '../../../entity'
import {Query} from './types'
import {Pagination} from '../../../utils/pagination'
import { ResponsePagination } from '../../../utils/typesGlobal'

export const getCategories = async (
        _:any,
        {query}:Query
        ): Promise<ResponsePagination<Category>> => {
    const categoryRepo = getRepository(Category)
    let qb = categoryRepo.createQueryBuilder('category')
    if(query?.search) {
        qb = qb.where('category.name ILIKE :textsearch',{ textsearch: `%${query.search}%` } )
    }
    const s = new Pagination<Category>()
    const list: Category[] = await s.pagination(query.limit, query.page, qb, 'category')
    const res: ResponsePagination<Category> = s.detailsPagination(list, query.limit, query.page,'categories')
    return res;
}
