const { generateToken } = require("../utils/tokenHelpers");
const ApiError = require("../utils/ApiError");

const authVerificationUser = async (req, res, next) => {
  try {
    const token = req.cookies["u_token"];

    if (!token) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const decodedToken = generateToken(token);

    if (decodedToken) {
      const email = decodedToken["email"];
      const _id = decodedToken["_id"];

      req.headers.email = email;
      req.headers._id = _id;
      next();
    } else {
      return next(new ApiError(401, "Unauthorized"));
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = authVerificationUser;
