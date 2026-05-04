const User = require("../models/user.model");

const userRepository = {
  // Create a new user
  createUser: async (user) => {
    return await User.create(user);
  },
  // Get all users
  getAllUsers: async () => {
    return await User.find().sort({ name: 1 });
  },
  // Get a user by ID
  getUserById: async (id) => {
    return await User.findById(id);
  },
  getUserByEmail: async (email) => {
    return await User.findOne({ email });
  },

  updateUser: async (id, user) => {
    return await User.findByIdAndUpdate(id, user, { new: true });
  },
  deleteUser: async (id) => {
    return await User.findByIdAndDelete(id);
  },
};

module.exports = userRepository;
