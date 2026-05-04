const { ZodError } = require("zod");
const ApiError = require("../utils/ApiError");

const formatZodIssues = (issues) => {
  return issues.map((issue) => {
    return {
      path: issue.path.join("."),
      message: issue.message,
    };
  });
};

const validate = ({ body, params, query }) => {
  return (req, _res, next) => {
    try {
      if (body) {
        req.body = body.parse(req.body);
      }
      if (params) {
        req.params = params.parse(req.params);
      }
      if (query) {
        req.query = query.parse(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          new ApiError(400, "Validation falied", formatZodIssues(error.issues)),
        );
      } else {
        next(error);
      }
    }
  };
};

module.exports = validate;
