const { Details, Users } = require("../models");
const { Thoughts } = require("../models/Details");

const thoughtsController = {
  //Find all thoughts
  async getAllThoughts(req, res) {
    let thoughts;
    try {
      thoughts = await Details.Thoughts.find({})
        .select("-_v")
        .sort({ _id: 0 })
        .populate({ path: "reactions", select: "-_v" });
    } catch (err) {
      console.log(err);
    }
    if (!thoughts) {
      return res.status(404).json({ message: "No thoughts found!" });
    }
    return res.status(200).json({ thoughts });
  },

  //Create new thought
  async createNewThought(req, res) {
    const { thoughtText, username } = req.body;
    let myUser = await Users.findOne({ name: username });
    // console.log(JSON.stringify(myUser));
    const thought = await Details.Thoughts.create({
      thoughtText: thoughtText,
      username: myUser._id,
    }).catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "Thought was not created" });
    });
    await Users.findOneAndUpdate(
      { _id: myUser._id },
      //push because adding array vs addtoset
      { $push: { thoughts: req.body, thoughts: thought._id } },
      { runValidators: true, new: true }
    ).populate({ path: "thoughts", select: "-_v" });
    return res.status(201).json(thought);
  },

  //Fetch specific thought
  async getThought({ params }, res) {
    let existingThought = await Details.Thoughts.findOne({
      _id: params.thoughtId,
    })
      .select("-_v")
      .sort({ _id: 0 })
      .populate({ path: "reactions", select: "-_v" })
      .catch((err) => {
        console.log(err);
      });
    // console.log(JSON.stringify(params));
    if (!existingThought) {
      return res.status(404).json({ message: "No thoughts found!" });
    }
    return res.status(200).json({ existingThought });
  },

  //Update thought by id
  async updateThought(req, res) {
  let existingThought = await Details.Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      //push because adding array vs addtoset
      { $set: req.body },
      { runValidators: true, new: true }
    ).catch((err) => {
      console.log(err);
    });
    if (!existingThought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }
    return res
      .status(200)
      .json({ message: "You have successfully updated a thought" });
  },

  //Delete thought
  async deleteThought({ params }, res) {
    let existingThought = await Details.Thoughts.findOneAndDelete({
      _id: params.thoughtId,
    })
      .select("-_v")
      .sort({ _id: 0 })
      .populate({ path: "reactions", select: "-_v" })
      .catch((err) => {
        console.log(err);
      });
    // console.log(JSON.stringify(params));
    if (!existingThought) {
      return res.status(404).json({ message: "No thoughts found!" });
    }
    return res
      .status(200)
      .json({ message: "You have successfully deleted a thought!" });
  },

  //Get all reactions
  async getAllReactions(req, res) {
    let reactions;
    try {
      thoughts = await Details.Reactions.find({})
        .select("-_v")
        .populate({ path: "reactions", select: "-_v" })
        .sort({ _id: 0 });
    } catch (err) {
      console.log(err);
    }
    if (!reactions) {
      return res.status(404).json({ message: "No reactions found!" });
    }
    return res.status(200).json({ reactions });
  },

  //Create new reaction and store within reactions array field
  async createReaction(req, res) {
    const { reactionBody, username } = req.body;
    let myUser = await Users.findOne({ name: username });
    let existingThought = await Details.Thoughts.findOne({
      _id: req.params.thoughtId,
    });
    // console.log(JSON.stringify(existingThought));
    // console.log(JSON.stringify(myUser));
    if (!existingThought) {
      return res.status(404).json({ message: "No thoughts found!" });
    }
    const reaction = await Details.Reactions.create({
      reactionBody: reactionBody,
      username: myUser._id,
    }).catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "Reaction was not created" });
    });

    await Details.Thoughts.findOneAndUpdate(
      { _id: existingThought._id },
      { $push: { reactions: req.body, thoughts: reaction._id } },
      { runValidators: true, new: true }
    ).populate({ path: "reactions", select: "-_v" });
    return res.status(201).json(reaction);
  },

  //Delete a reaction by the id
  async deleteReaction({params}, res) {
    let existingReaction = await Details.Reactions.findOneAndDelete({
      _id: params.reactionId,
    })
      .select("-_v")
      .sort({ _id: 0 })
      .populate({ path: "reactions", select: "-_v" })
      .catch((err) => {
        console.log(err);
      });
    // console.log(JSON.stringify(params));
    if (!existingReaction) {
      return res.status(404).json({ message: "No reactions found!" });
    }
    return res
      .status(200)
      .json({ message: "You have successfully deleted a reaction!" });
  },
};

module.exports = thoughtsController;
