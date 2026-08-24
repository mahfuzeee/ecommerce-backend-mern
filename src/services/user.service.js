const userRepository = require("../repositories/user.repository");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenHelpers");
const sendResponse = require("../utils/apiResponse");

const userService = {
  // Create a new user
  createUser: async (user) => {
    const existingUser = await userRepository.getUserByEmail(user.email);

    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }
    return await userRepository.createUser(user);
  },

  // User Login
  loginUser: async (credentials) => {
    try {
      const user = await userRepository.getUserByEmail(credentials.email);

      if (!user) {
        throw new ApiError(401, "Invalid credentials");
      }

      const isMatch = await bcrypt.compare(credentials.password, user.password);

      // if (!isMatch) {
      //   throw new ApiError(401, "Invalid credentials");
      // }

      const token = generateToken(user.email, user._id.toString());
      return { user, token };
    } catch (error) {
      throw new ApiError(401, "Invalid credentials");
    }
  },

  //Get a user profile
  getUser: async (email) => {
    const user = await userRepository.getUser(email);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  },
  getUserByEmail: async (email) => {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  },

  //update user data: name, email, password, etc.
  updateUser: async (id, payload) => {
    const { password } = payload;
    if (!payload.shippingName) {
      payload.shippingName = payload.name;
    }
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    //Check the is isMatched

    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new ApiError(401, "Invalid Password");
      }

      payload.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userRepository.updateUser(id, payload);

    return updatedUser;
  },

  //Delete a user permanently
  deleteUser: async (id) => {
    const user = await userRepository.deleteUser(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  },
};

module.exports = userService;
