const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const multer = require('multer');
const path = require('path');

// Image upload configuration using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filenames
    }
});

const upload = multer({ storage: storage });

// Generate Auth Token
const generateAuthToken = async (user) => {
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

// User Registration
const registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmpassword } = req.body;
        if (!username || !email || !password || !confirmpassword) {
            return res.json({ error: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.json({ error: 'Password should be at least 6 characters long' });
        }
        if (password !== confirmpassword) {
            return res.json({ error: "Passwords don't match" });
        }
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: 'Email is already taken' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = await generateAuthToken(user);
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 2589200000),
            httpOnly: true
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({ error: 'An error occurred during registration' });
    }
};

// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'No user found' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            const token = await generateAuthToken(user);
            res.cookie("jwtoken", token, { expires: new Date(Date.now() + 2589200000), httpOnly: true });
            return res.json({ message: 'Login successful', token });
        } else {
            return res.json({ error: 'Incorrect password' });
        }
    } catch (error) {
        return res.json({ error: 'An error occurred during login' });
    }
};

// Password Reset
const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'User not found' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return res.json({ success: 'Password updated successfully!' });
    } catch (error) {
        return res.status(500).json({ error: 'Error while resetting the password' });
    }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'No user found' });
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.json({ status: 'Token generated', token });
    } catch (error) {
        return res.status(500).json({ status: 'Internal Server Error' });
    }
};

// Image Upload
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }
        const imageUrl = `uploads/${req.file.filename}`;
        return res.json({ message: 'Image uploaded successfully', imageUrl });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to upload image' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    resetPassword,
    forgotPassword,
    uploadImage,
};
