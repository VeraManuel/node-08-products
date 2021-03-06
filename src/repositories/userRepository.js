const bcrypt = require("bcryptjs");
const User = require("../models/user");

class UserRepository {
  constructor() {}

  async findAll() {
    return await User.find();
  }

  async findAllWithPagination(filter, options) {
    return await User.paginate(filter, options);
  }

  async getById(id) {
    return await User.findById(id);
  }

  async getByEmail(email) {
    return await User.findOne({ email });
  }

  async save(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return await User.create(user);
  }

  async update(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }

  async remove(id) {
    return await User.findByIdAndRemove(id);
  }
}

module.exports = UserRepository;
