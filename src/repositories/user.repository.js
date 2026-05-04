const User = require("../models/user.model");

const userRepository = {
  getAllUsers: async () => {
    return await User.find().sort({ name: 1 });
  },
  getUserById: async (id) => {
    return await User.findById(id);
  },
  getUserByEmail: async (email) => {
    return await User.findOne({ email });
  },
  createUser: async (user) => {
    return await User.create(user);
  },
  updateUser: async (id, user) => {
    return await User.findByIdAndUpdate(id, user, { new: true });
  },
  deleteUser: async (id) => {
    return await User.findByIdAndDelete(id);
  },
};

module.exports = userRepository;
