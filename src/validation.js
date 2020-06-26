const Joi = require("@hapi/joi");

// ORDER VALIDATION
const orderValidation = (data) => {
  const schema = Joi.object({
    productName: Joi.string().required(),
    customerId: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.orderValidation = orderValidation;
