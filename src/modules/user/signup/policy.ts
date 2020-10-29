import { Data } from "./types";
import {UserInputError} from 'apollo-server-express'
import Joi from 'joi'
import {skip} from 'graphql-resolvers'

export const validateRegister = (_:any, {data}:Data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).normalize().trim().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required()
    })
    const validate = schema.validate({name: data.name ,email: data.email, password: data.password})
    if(validate.error) {
        switch (validate.error.details[0].context?.key) {
            case 'name': 
                throw new UserInputError('Name should be valid, should be greater than 8 and less than 30')
                break;
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