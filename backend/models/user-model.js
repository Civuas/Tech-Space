const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
      get: (avatar) => {
        if (avatar) {
          return `${process.env.BASE_URL}${avatar}`;
        }
        return avatar;
      },
    },
    activated: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
