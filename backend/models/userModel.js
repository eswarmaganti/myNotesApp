import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPwd) {
  return await bcrypt.compare(enteredPwd, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
