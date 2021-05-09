import Joi from "joi";

export default {
  empSchema: Joi.object().keys({
    EmpId: Joi.number().integer().min(2).required(),
    Name: Joi.string()
      .pattern(new RegExp("^(?=.*?[a-zA-Z]).{3,30}$"))
      .required(),
    Email: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"))
      .required(),
    Designation: Joi.string()
      .pattern(new RegExp("^(?=.*?[a-zA-Z]).{2,}$"))
      .required(),
    Password: Joi.string()
      .pattern(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z]).{8,32}$"))
      .required(),
    Department: Joi.string().alphanum().min(2).required(),
    Salary: Joi.number().integer().min(1000).required(),
  }),

  empLoginSchema: Joi.object().keys({
    Email: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"))
      .required(),
    Password: Joi.string()
    .pattern(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z]).{8,32}$"))
    .required(),
  }),
};
