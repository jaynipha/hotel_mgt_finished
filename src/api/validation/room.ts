import Joi from 'joi';


export const createRoomSchema = {
  name: Joi.string().trim().required(),
  roomType: Joi.string().trim().required(),
  price: Joi.number().required()
};

export const roomTypeSchema = {
    name: Joi.string().trim().required()
  };