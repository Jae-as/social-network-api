const bcrypt = require("bcryptjs");
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
      return res.status(404).json({ messgae: "No users found!" });
    }
    return res.status(200).json({ users });
  },

  //Create new user
  async createNewUser(req, res) {
    const { name, email, password } = req.body;

    let existingUser;
    try {
      existingUser = await Users.findOne({ _id: req.params.userId });
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
    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
    }).catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "User was not created" });
    });
    return res.status(201).json({ user });
  },

  //Update user information
  async updateUserInfo(req, res) {
    const { name } = req.body;
    let existingUser;
    try {
      existingUser = await Users.findOne({ _id: req.params.userId });
    } catch (err) {
      console.log(err);
    }
    if (!existingUser) {
      return res.status(404).json({
        messgae: "There is no user found with this email address!",
      });
    }
    const userInfo = Users({ name });

    try {
      await userInfo.update();
    } catch (err) {
      console.log(err);
    }
    return res.status(201).json({ userInfo });
  },

  //Get single user with associated thoughts and friend data
  async getSingleUser({params}, res) {
    let existingUser;
    try {
      existingUser = await Users.findOne({ email: params.email })
        .populate({ path: "thoughts", select: "-_v" })
        .populate({ path: "friends", select: "-_v" });
    } catch (err) {
      console.log(err);
    }
    if (!existingUser) {
      return res.status(400).json({
        message: "No user found with this id!",
      });
    }
    return res.status(201).json({ existingUser });
  },

  //Delete user
  async deleteUser(req, res) {
    const { name, password } = req.body;
    let existingUser;
    try {
      existingUser = await Users.findOne({ _id: req.params.userId });
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
  },

  //Add friend
  async addFriend(req, res) {
    await Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: "No user was found with that id" })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Delete friend
  async deleteFriend(req, res) {
    await Users.findOneAndRemove({ _id: req.params.friendId })
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: "No user exists" })
          : User.findOneAndUpdate(
              { friends: req.params.friendId },
              { $pull: { friends: req.params.friendId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Friend deleted, nut no associated user found" })
          : res.json({ message: "Friend successfully removed" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = usersController;
