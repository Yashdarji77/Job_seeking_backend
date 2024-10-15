import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Your Name!"],
    minLength: [3, "Name must contain at least 3 characters!"],
    maxLength: [30, "Name can't exceed 30 characters!"],
  },
  email: {
    type: String,
    required: [true, "Please Provide Your Email!"],
    validate: [validator.isEmail, "Please Enter a valid Email!"],
  },
  phone: {
    type: Number,
    required: [true, "Please Provide Your Phone Number!"],
    minLength: [10, "Phone Number must contain at least 10 digits!"],
  },
  password: {
    type: String,
    required: [true, "Please Provide Your Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password can't exceed 30 characters!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please Provide Your Role!"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Hashing Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Comparing Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating Jwt Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
