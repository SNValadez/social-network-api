const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const validator = require("validator");

validator.isEmail("foo@bar.com");

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(data) {
        if (!validator.default.isEmail(data)) {
          throw new Error("Not a valid e-mail!");
        }
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of comments and replies on retrieval
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create the User model
const User = model("User", UserSchema);

// export the User model
module.exports = User;
