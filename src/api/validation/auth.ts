import Joi from 'joi';


export const signupSchema = {
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
  role: Joi.string().required().trim(),
};

export const signinSchema = {
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().trim().min(4).max(30).required(),
};
