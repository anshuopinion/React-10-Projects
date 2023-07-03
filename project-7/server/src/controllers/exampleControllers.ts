import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Example from "../model/Example";

export const getExample: RequestHandler = (req, res, next) => {
  res.json({ message: "hello" });
};
export const getExampleData: RequestHandler = async (req, res, next) => {
  const { name, id }: IExampleData = req.body;

  try {
    const example = await Example.findOne({ name });

    if (example) return next(createHttpError(406, "example already exists"));

    const newExample = new Example({ name, id });

    await newExample.save();

    res.json({ name, id });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};
