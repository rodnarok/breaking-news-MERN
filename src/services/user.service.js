import User from "../models/User.js";

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (
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
  createService,
  findAllService,
  findByIdService,
  updateService,
};

/*import userRepositories from "../repositories/user.repositories";
import authService from "../services/auth.service";
import bcrypt from "bcryptjs";

const createUserController = async ({
  name,
  username,
  email,
  password,
  avatar,
  background,
}) => {
  if (!name || !username || !email || !password || !avatar || !background) {
    res.status(400).send({ message: "Submit all fields for registration" });
  }

  const newUser = { name, username, email, password, avatar, background };

  const user = await userRepositories.createUserRepository(newUser);

  if (!user) {
    return res.status(400).send({ message: "Error creating User" });
  }

  res.status(201).send({
    message: "User created sucessfully",
    user: {
      id: user._id,
      name,
      username,
      email,

      avatar,
      background,
    },
  });
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "There are no registered users" });
    }

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// buscar parametro pelo id
const findById = async (req, res) => {
  /* if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message: "Invalid ID"})
    }  
        ******* ****** ESTE CODIGO AQUI E MAIS OUTRO FORAM CRIADOS NOS MIDDLEWARES

  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      res.status(400).send({ message: "Submit at least one field for update" });
    }

    const { id, user } = req;

    await userService.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );

    res.send({ message: "User successfully updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll, findById, update };
*/
