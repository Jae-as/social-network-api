const { Details, Users } = require("../models");

const thoughtsController = {
  //Find all thoughts
  async getAllThoughts(req, res) {
    let thoughts;
    try {
      thoughts = await Details.Thoughts.find({});
      // .select("-_v").sort({ _id: 0 });
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
      { $push: { thoughts: thought._id } },
      { runValidators: true, new: true }
    )
    return res.status(201).json(thought);
  },

  //Fetch specific thought
  async getThought(req, res) {
    let existingThought;

    try {
      existingThought = await Details.Thoughts.findOne({
        _id: req.params.thoughtsId,
      }).populate({
        path: "reactions",
        select: "-_v",
      });
    } catch (err) {
      console.log(err);
    }
    if (!existingThought) {
      return res
        .status(400)
        .json({ message: "No thought found with this id!" });
    }
  },

  //Update thought by id
  async updateThought(req, res) {
    const { thoughtText, username } = req.body;
    let existingThought;

    try {
      existingThought = await Details.Thoughts.findOne({
        _id: req.params.thoughtsId,
      }).populate({
        path: "reactions",
        select: "-_v",
      });
    } catch (err) {
      console.log(err);
    }
    if (!existingThought) {
      return res
        .status(400)
        .json({ message: "No thought found with this id!" });
    }
    const thought = new Thoughts({ thoughtText, username });
    try {
      await thought.update();
    } catch (err) {
      console.log(err);
    }
    return res.status(201).json({ thought });
  },

  //Delete thought
  async deleteThought(req, res) {
    const { thoughtText, username } = req.body;
    let existingThought;

    try {
      existingThought = await Details.Thoughts.findOne({
        _id: req.params.thoughtsId,
      }).populate({
        path: "reactions",
        select: "-_v",
      });
    } catch (err) {
      console.log(err);
    }
    if (!existingThought) {
      return res
        .status(400)
        .json({ message: "No thought found with this id!" });
    }
    const thought = new Thoughts({ thoughtText, username });
    try {
      await thought.destroy();
    } catch (err) {
      console.log(err);
    }
    return res
      .status(400)
      .json({ message: "You have successfully deleted a thought!" });
  },

  //Get all reactions
  async getAllReactions(req, res) {
    let reactions;

    try {
      reactions = await Details.Reactions.findOne({
        _id: req.params.thoughtsId,
      })
        .populate({ path: "reactions", select: "-_v" })
        .select("-_v");
    } catch (err) {
      console.log(err);
    }
    if (!reactions) {
      return res
        .status(404)
        .json({ message: "No reactions found associated with this ID!" });
    }
    return res.status(200).json({ reactions });
  },

  //Create new reaction and store within reactions array field
  async createReaction(req, res) {
    const { reactionBody, username } = req.body;
    let thought;
    try {
      thought = await Details.Reactions.findOne({ _id: req.params.thoughtsId });
    } catch (err) {
      console.log(err);
    }
    if (!thought) {
      return res
        .status(404)
        .json({ message: "There are no thoughts with this id" });
    }
    const reaction = new Reaction({ reactionBody, username });

    try {
      await reaction.save();
    } catch (err) {
      console.log(err);
    }
    return res.status(201).json({ reaction });
  },

  //Delete a reaction by the id
  async deleteReaction(req, res) {
    const { reactionBody, username } = req.body;
    let thought;
    try {
      thought = await Details.Reactions.findOne({ _id: req.params.thoughtsId });
    } catch (err) {
      console.log(err);
    }
    if (!thought) {
      return res
        .status(404)
        .json({ message: "There are no thoughts with this id" });
    }
    const reaction = Reaction({ reactionBody, username });

    try {
      await reaction.destroy();
    } catch (err) {
      console.log(err);
    }
    return res
      .status(400)
      .json({ message: "You have successfully deleted a reaction!" });
  },
};

module.exports = thoughtsController;
