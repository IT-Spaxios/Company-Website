import { randomBytes, createHash } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";   // ✅ bcrypt methods
import jwt from "jsonwebtoken"; // ✅ jwt methods

// ✅ Extract Schema and model from mongoose
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"]
  },
  photo: {
    type: String,
    default: "user.png"
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters"],
    required: [true, "Please provide a password"],
    select: false
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  },
  readList: [
    {
      type: Schema.Types.ObjectId, // ✅ Fixed Schema reference
      ref: "Story"
    }
  ],
  readListLength: {
    type: Number,
    default: 0
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

// ✅ Hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10); // ✅ Correct bcrypt usage
  this.password = await bcrypt.hash(this.password, salt); // ✅ Correct bcrypt usage
  next();
});

// ✅ Generate JWT
UserSchema.methods.generateJwtFromUser = function () {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

  const payload = {
    id: this._id,
    username: this.username,
    email: this.email
  };

  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE }); // ✅ Correct jwt usage
};

// ✅ Generate reset password token
UserSchema.methods.getResetPasswordTokenFromUser = function () {
  const { RESET_PASSWORD_EXPIRE } = process.env;

  const randomHexString = randomBytes(20).toString("hex");
  const resetPasswordToken = createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordExpire = new Date(Date.now() + parseInt(RESET_PASSWORD_EXPIRE));

  return resetPasswordToken;
};

const User = model("User", UserSchema);
export default User;
