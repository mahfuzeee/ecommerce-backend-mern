const userRepository = require("../repositories/user.repository");
const ApiError = require("../utils/ApiError");

const userService = {
  getAllUsers: async () => {
    return await userRepository.getAllUsers();
  },
  getUserById: async (id) => {
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
  createUser: async (user) => {
    return await userRepository.createUser(user);
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
};

module.exports = userService;
