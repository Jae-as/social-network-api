const bcrypt =require("bcryptjs");
const { Users, Thoughts } = require("../models");

const usersController = {
  //Find all users
  async getAllUsers(req, res) {
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
  },

  //Create new user
  async createNewUser(req, res) {
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
  },

  //Update user information
  async updateUserInfo(req, res) {
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
  },

  //Get single user with associated thoughts and friend data
  async getSingleUser(req, res) {
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
  },

  //Delete user
  async deleteUser(req, res) {
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
  },

  //Add friend
  async addFriend(req, res) {
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
        messgae: "There is no user found with this id!",
      });
    }

    const newFriend = Users({ friends: [] });
    if (req.body.friends.length > 0) {
      const newFriendArray = req.body.friends.map((newFriend) => {});
    }
    return Promise.all([Users.bulkCreate(newFriendArray), res.json(newFriend)]);
  },

  //Delete friend
  async deleteFriend(req, res) {
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
        messgae: "There is no user found with this id!",
      });
    }
    const friend = Users({friends});
    try {
      await friend.destroy();
    } catch (err) {
      console.log(err);
    }
    return res
      .status(400)
      .json({ message: "You have successfully remived a friend!" });
  }
};

module.exports = usersController;