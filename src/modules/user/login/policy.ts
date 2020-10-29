import Joi from 'joi'
import {skip} from 'graphql-resolvers'
import { UserInputError } from 'apollo-server-express'
import { Data } from './types'

export const validateLogin = (_: any, { data }:Data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required()
    })
    const validate = schema.validate({email: data.email, password: data.password})
    if(validate.error) {
        switch (validate.error.details[0].context?.key) {
            case 'email':
                throw new UserInputError('Email should be valid')
            break;
            case 'password':
                throw new UserInputError('Password is obligatory, should be greater than 8 and less than 30')
            break;
            default:
                throw new UserInputError('All fields are obligatories')
                break;
        }
    }
    return skip;
}

