import Joi, {ObjectSchema} from "joi";
import {BookDto} from "../model/BookDto.js";

export const bookDtoSchema:ObjectSchema<BookDto> = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    quantity: Joi.number().positive().max(100)
})

export const bookIdSchema = Joi.string().length(26).required()

export const readerSchema = Joi.string().required();

export const pickUpBookSchema = Joi.object({
    id:Joi.string().length(36).required(),
    reader: Joi.string().required() //to scale
})

export const readerAccountSchema = Joi.object({
    userName: Joi.string().max(50).min(5).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    birthdate: Joi.string().length(10).required()
})

export const passwordUpdateSchema = Joi.object({
    password: Joi.string().min(8).required(), // Adjust based on your password requirements
});

export const profileUpdateSchema = Joi.object({
    userName: Joi.string().max(50).min(5).required(),
    email: Joi.string().email().required(),
    birthdate: Joi.string().length(10).required()
})