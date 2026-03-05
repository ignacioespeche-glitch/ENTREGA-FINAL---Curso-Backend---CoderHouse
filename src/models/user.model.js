import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    default: "user"
  },
  last_connection: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);