import bcrypt from "bcryptjs";
const { Users } = require("../models");


//Find all users
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await Users.find({}).select("-_v").sort({ _id: 0 });
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ messgae: "No users found!" });
  }
  return res.status(200).json({ users });
};

//Create new user
export const createNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await Users.findOne({ _id: params.id });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({
      messgae:
        "Email already associated with existing user. Please login instead!",
    });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new Users({ name, email, password: hashedPassword });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ user });
};

//Update user information
export const updateUserInfo = async (req, res, next) => {
  const { name, password } = req.body;
  let existingUser;
  try {
    existingUser = await Users.findOne({ _id: params.id });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({
      messgae: "There is no user found with this email address!",
    });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const userInfo = Users({ name, password: hashedPassword });

  try {
    await userInfo.update();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ userInfo });
};

//Get single user with associated thoughts and friend data
export const getSingleUser = async (req, res, next) => {
  let existingUser;
  try {
    existingUser = await Users.findOne({ _id: params.id })
      .populate({ path: "thoughts", select: "-_v" })
      .populate({ path: "friends", select: "-_v" });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({
      messgae: "No user found with this id!",
    });
  }
};

//Delete user
export const deleteUser = async (req, res, next) => {
  const { name, password } = req.body;
  let existingUser;
  try {
    existingUser = await Users.findOne({ _id: params.id });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({
      messgae: "There is no user found with this email address!",
    });
  }
  const userInfo = Users({ name, email, password });
  const associatedThoughts = Thoughts({
    thoughtText,
    createdAt,
    username,
    reactions,
  });

  try {
    await userInfo.destroy();
    await associatedThoughts.destroy();
  } catch (err) {
    console.log(err);
  }
  return res
    .status(400)
    .json({ message: "You have successfully deleted a user!" });
};

//Add friend
export const addFriend = async (req, res, next) => {
  const {
    friends: [],
  } = req.body;
  let existingUser;
  try {
    existingUser = await Users.findOne({ _id: params.id });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({
      messgae: "There is no user found with this email address!",
    });
  }

  const newFriend = Users({ friends: [] });
  if (req.body.friends.length > 0) {
    const newFriendArray = req.body.friends.map((newFriend) => {});
  }
  return Promise.all([Users.bulkCreate(newFriendArray), res.json(newFriend)]);
};

//Delete friend
export const deleteFriend = async (req, res, next) => {};
