const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const objectId = require("mongoose").Types.ObjectId;

//User Repository
const userRepository = {
  // Create a new user
  createUser: async (user) => {
    return await User.create(user);
  },
  // Get all users
  getAllUsers: async () => {
    return await User.find().sort({ name: 1 });
  },
  // Get a user profile data
  getUser: async (email) => {
    try {
      const matchStage = { $match: { email } };
      const projection = {
        $project: {
          _id: 0,
          name: 1,
          email: 1,
        },
      };
      const user = await User.aggregate([matchStage, projection]);
      return user;
    } catch (error) {
      return new ApiError(500, "Server Error");
    }
  },

  //get an user by email.
  getUserByEmail: async (email) => {
    return await User.findOne({ email }).select("+password");
  },

  getUserById: async (userId) => {
    const id = new objectId(userId);
    return await User.findById(id);
  },

  //updata user data: name, password, etc.
  updateUser: async (id, user) => {
    return await User.findByIdAndUpdate(id, user, { new: true });
  },

  //delete and user permanently
  deleteUser: async (id) => {
    return await User.findByIdAndDelete(id);
  },

  //Count users
  count: async () => {
    return await User.countDocuments();
  },
};

module.exports = userRepository;
