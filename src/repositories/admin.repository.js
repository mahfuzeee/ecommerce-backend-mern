const Admin = require("../models/admin.model");

const adminRepository = {
  createAdmin: async (name, email, password) => {
    const admin = await Admin.create({ name, email, password });
    return admin;
  },

  getAdminByEmail: async (email) => {
    const admin = await Admin.findOne({ email }).select("+password");
    return admin;
  },

  //Get modified admin data
  getAdminData: async (email) => {
    const matchStage = { $match: { email } };
    const projection = {
      $project: {
        _id: 0,
        password: 0,
      },
    };

    const admin = await Admin.aggregate([matchStage, projection]);
    return admin;
  },

  //Get admin by Email and/or Id
  getAdminByIdOrEmail: async (email, _id) => {
    const admin = await Admin.findOne({ email, _id });
    return admin;
  },

  //Update admin
  updateAdmin: async (_id, data) => {
    const admin = await Admin.findByIdAndUpdate({ _id }, data, {
      new: true,
    });
    return admin;
  },
};

module.exports = adminRepository;
