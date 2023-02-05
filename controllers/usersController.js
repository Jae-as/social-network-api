// const bcrypt = require("bcryptjs");
const { Users, Thoughts } = require("../models");

const usersController = {
  //Find all users
  async getAllUsers(req, res) {
    let users;
    try {
      users = await Users.find({})
        .select("-_v")
        .sort({ _id: 0 })
        .populate({ path: "thoughts", select: "-_v" })
        .populate({ path: "friends", select: "-_v" });
    } catch (err) {
      console.log(err);
    }
    if (!users) {
      return res.status(404).json({ message: "No users found!" });
    }
    return res.status(200).json({ users });
  },

  //Create new user
  async createNewUser(req, res) {
    const { name, email, password } = req.body;

    let existingUser;
    try {
      existingUser = await Users.findOne({ email: req.params.email });
    } catch (err) {
      console.log(err);
    }
    if (existingUser) {
      return res.status(400).json({
        messgae:
          "Email already associated with existing user. Please login instead!",
      });
    }
    // const hashedPassword = bcrypt.hashSync(password);
    const user = await Users.create({
      name,
      email,
      password,
    }).catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "User was not created" });
    });
    return res.status(201).json({ user });
  },

  //Update user information
  async updateUserInfo(req, res) {
    const { name, email, password } = req.body;
    // const hashedPassword = bcrypt.hashSync(password);
    let existingUser = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .populate({ path: "thoughts", select: "-_v" })
      .populate({ path: "friends", select: "-_v" })
      .catch((err) => {
        console.log(err);
      });
    if (!existingUser) {
      return res.status(400).json({
        message: "No user found with this id!",
      });
    }
    return res
      .status(200)
      .json({ message: "You have successfully updated user info" });
  },

  //Get single user with associated thoughts and friend data
  async getSingleUser({ params }, res) {
    let existingUser = await Users.findOne({ _id: params.userId })
      .populate({ path: "thoughts", select: "-_v" })
      .populate({ path: "friends", select: "-_v" })
      .catch((err) => {
        console.log(err);
      });
    if (!existingUser) {
      return res.status(400).json({
        message: "No user found with this id!",
      });
    }
    return res.status(200).json({ existingUser });
  },

  //Delete user
  async deleteUser({ params }, res) {
    let existingUser = await Users.findOneAndDelete({ _id: params.userId })
      .populate({ path: "thoughts", select: "-_v" })
      .populate({ path: "friends", select: "-_v" })
      .catch((err) => {
        console.log(err);
      });
    if (!existingUser) {
      return res.status(400).json({
        message: "No user found with this id!",
      });
    }
    return res
      .status(200)
      .json({ message: "You have successfully deleted a user!" });
  },

  //Add friend
  async addFriend({ params }, res) {
    let myUser = await Users.findOne({ _id: params.userId }).catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "No user with that id" });
    });
    // console.log(JSON.stringify(myUser));
    let myFriend = await Users.findOne({
      _id: params.friendId,
    }).catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "No user with that id" });
    });
    // console.log(myUser);
    // console.log(myFriend);
    await Users.findOneAndUpdate(
      { _id: myUser._id },
      //push because adding array vs addtoset
      { $push: { friends: myFriend._id } },
      { runValidators: true, new: true }
    )
      .populate({ path: "friends", select: "-_v" })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "Friend was not updated" });
      });
    await Users.findOneAndUpdate(
      { _id: myFriend._id },
      //push because adding array vs addtoset
      { $push: { friends: myUser._id } },
      { runValidators: true, new: true }
    )
      .populate({ path: "friends", select: "-_v" })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "Friend was not updated" });
      });
    return res
      .status(201)
      .json({ message: "You have successfully added a friend!" });
  },

  //Delete friend
  async deleteFriend({ params }, res) {
    let myUser = await Users.findOne({ _id: params.userId }).catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "No user with that id" });
    });
    // console.log(JSON.stringify(myUser));
    let myFriend = await Users.findOne({
      _id: params.friendId,
    }).catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "No user with that id" });
    });
    // console.log(myUser);
    // console.log(myFriend);
    await Users.findOneAndUpdate(
      { _id: myUser._id },
      //push because adding array vs addtoset
      { $pull: { friends: myFriend._id } },
      { runValidators: true, new: true }
    )
      .populate({ path: "friends", select: "-_v" })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "Friend was not updated" });
      });
    return res
      .status(201)
      .json({ message: "You have successfully removed a friend!" });
  },
};

module.exports = usersController;
