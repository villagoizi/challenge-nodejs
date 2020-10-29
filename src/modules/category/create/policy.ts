import Joi from 'joi'
import {skip} from 'graphql-resolvers'
import { UserInputError } from 'apollo-server-express'
import { CategoryData } from './types'

export const validateCategory = (_: any, {name} : CategoryData) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(15).required(),
    })
    const validate = schema.validate({name: name})
    if(validate.error) {
        switch (validate.error.details[0].context?.key) {
            case 'name':
                throw new UserInputError('Name is obligatory, it should be greater than 3 and less than 15 characters')
            break;
            default:
                throw new UserInputError('Field name is obligatory')
                break;
        }
    }
    return skip;
}

