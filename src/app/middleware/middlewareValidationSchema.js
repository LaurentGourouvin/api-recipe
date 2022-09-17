const ajv = require("../schema");

const middlewareValidationSchema =
  (schemaName) => (request, response, next) => {
    const validate = ajv.getSchema(schemaName);
    if (!validate(request.body))
      return response.status(400).json(validate.errors);
    next();
  };

module.exports = middlewareValidationSchema;
