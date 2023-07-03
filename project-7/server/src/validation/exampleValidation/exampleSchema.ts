import Joi from "joi";

export const exampleSchema = {
  getExampleData: Joi.object({
    name: Joi.string().required(),
    id: Joi.number().required(),
  }),
};
