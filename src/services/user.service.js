const userRepository = require("../repositories/user.repository");
const ApiError = require("../utils/ApiError");

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
    return await userRepository.loginUser(credentials);
  },

  //Get a user by ID
  getUser: async (id) => {
    const user = await userRepository.getUserById(id);

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

  updateUser: async (id, payload) => {
    const user = await userRepository.updateUser(id, payload);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  },
  deleteUser: async (id) => {
    const user = await userRepository.deleteUser(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  },

  logoutUser: async (token) => {
    return await userRepository.logoutUser(token);
  },
};

module.exports = userService;
