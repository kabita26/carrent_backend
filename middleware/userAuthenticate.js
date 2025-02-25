
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    req.token = token;

    next(); 

  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).send('Unauthorized: Invalid token');
  }
};

module.exports = authenticateUser;
