'use strict';
import mongoose from './index.js';
const Schema = mongoose.Schema;

const userSchema = new Schema<UserInfo>({
  email: {
    type: String,
    required: [true, 'email is missing'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is missing'],
  },
});

const User = mongoose.model('User', userSchema);

export default User;
