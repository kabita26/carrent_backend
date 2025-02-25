const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  profilePicture: {
    type: String, // This will store the file path
  },
});

// Other methods...

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
