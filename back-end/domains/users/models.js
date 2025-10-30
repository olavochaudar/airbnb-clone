import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

// Reuse existing model if it was already compiled (avoids OverwriteModelError when using --watch)
const UserModel = mongoose.models.User || model('User', userSchema);
export default UserModel;
