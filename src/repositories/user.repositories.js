import User from "../models/User.js";

const createUserRepository = (body) => User.create(body);

const findAllUserRepository = () => User.find();

const findByIdUserRepository = (id) => User.findById(id);

const updateUserRepository = (
  id,
  name,
  username,
  email,
  password,
  avatar,
  background
) =>
  User.findOneAndUpdate(
    { _id: id },
    { id, name, username, email, password, avatar, background }
  );

export default {
  createUserRepository,
  findAllUserRepository,
  findByIdUserRepository,
  updateUserRepository,
};
