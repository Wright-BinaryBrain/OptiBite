const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Favourite = require("../Model/Favourite");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 100,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    contactNo1: {
      type: String,
      maxLength: [10, "Please enter a valid number"],
      minLength: [10, "Please enter a valid number"],
      unique: true,
      required: true,
    },
    contactNo2: {
      type: String,
      maxLength: [10, "Please enter a valid number"],
      minLength: [10, "Please enter a valid number"],
      unique: false,
    },
    role: {
      type: String,
      enum: ["admin", "superAdmin", "customer"],
      tolowercase: true,
      default: "customer",
      required: [true, "Please enter a role"],
    },
    passwordChangedAt: {
      type: Date,
      default: Date.now(),
    },
    address: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

//Encrypting the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hashSync(this.password, 14);
});

userSchema.methods.encryptPassword = async function (password) {
  console.log("aaa", password);
  this.password = await bcrypt.hashSync(password, 14);
  console.log(this.password);
};

//Compare User Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

module.exports = mongoose.model("User", userSchema);
