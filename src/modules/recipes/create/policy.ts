import Joi from 'joi'
import {skip} from 'graphql-resolvers'
import { UserInputError } from 'apollo-server-express'
import { Data } from './types'

export const validateRecipe = (_: any, {data} : Data) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(60).required(),
        description: Joi.string().trim().min(15).required(),
        ingredients: Joi.array().items(Joi.string().trim().min(3)).min(1).required(),
        category: Joi.number().required()

    })
    const validate = schema.validate({name: data.name, description: data.description, ingredients: data.ingredients, category: data.category})
    if(validate.error) {
        const key = validate.error.details[0].context?.key
        switch (validate.error.details[0].context?.key) {
            case 'name':
                throw new UserInputError(`The field ${key} is obligatory, it should be greater than 3 and less than 60 characters`)
            break;
            case 'description':
                throw new UserInputError(`The field ${key} is obligatory, it should be greater than 15`)
            break;
            case 'ingredients':
                throw new UserInputError(`The field ${key} is obligatory, it should be an one items`)
            break;
            case 'category':
                throw new UserInputError(`The field ${key} is obligatory, it should be an one category`)
            break;
            default:
                throw new UserInputError('All fields are obligatories')
                break;
        }
    }
    return skip;
}

