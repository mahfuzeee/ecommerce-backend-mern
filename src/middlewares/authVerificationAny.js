const { verifyToken } = require("../utils/tokenHelpers");
const ApiError = require("../utils/ApiError");

const authVerificationAny = async (req, res, next) => {
  try {
    const token = req.cookies["u_token"] || req.cookies["a_token"];

    if (!token) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return next(new ApiError(401, "Unauthorized"));
    }

    req.headers.email = decodedToken.email;
    req.headers._id = decodedToken._id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authVerificationAny;
