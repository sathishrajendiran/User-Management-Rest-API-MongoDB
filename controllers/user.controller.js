const { v4: uuid4 } = require("uuid");

const User = require("../models/user.model");
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "User Not Found",
    });
  }
};
const createUser = async (req, res) => {
  if (!req.body.name) {
    res.status(404).json({ message: "name is required" });
    return;
  }
  try {
    const newUser = new User({
      id: uuid4(),
      name: req.body.name,
      age: Number(req.body.age),
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: "Users Not Found",
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });

    user.name = req.body.name;
    user.age = Number(req.body.age);

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Users Not Updated",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ id: req.params.id });
    res.status(200).json({
      message: "User is deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "User Not Found",
    });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
