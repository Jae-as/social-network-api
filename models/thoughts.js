const {Schema, Types} = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      get: (date) => timeSince(date),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      get: (date) => timeSince(date),
      allowNull: false,
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function(){return this.reactions.length;});

const Thoughts = model("thoughts", thoughtSchema);
const Reactions = model("reactions", reactionSchema);

module.exports = Thoughts;
module.exports = Reactions;
