const User = require('../models/user');


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            res.status(403).json('Email already exists')
        }
        // first registered user is an admin
        const isFirstAccount = (await User.countDocuments({})) === 0;
        const role = isFirstAccount ? 'admin' : 'user';
        const user = await User.create({name, email, password, role})
        // Create JWT token
        const { token, expirationDate } = await user.CreateJWTToken();
        res.status(201).json(
        {
            message: 'Registration successful',
            uid: user._id,
            name: user.name,
            email: user.email,
            token, // Include token in response
            expiresIn: expirationDate, // Include expiration date in milliseconds
            role: user.role // Include user's role in response
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json("Email doesn't exist");
        }

        // Check password correctness
        const isCorrectPassword = await user.comparePassword(password);
        if (!isCorrectPassword) {
            return res.status(401).json("Wrong password");
        }

        // Create token
        const { token, expirationDate } = await user.CreateJWTToken();
        return res.status(200).json({ 
            message: 'Login successful',
            uid: user._id,
            name: user.name,
            email: user.email,
            token, // Include token in response
            expiresIn: expirationDate, // Include expiration date in milliseconds
            role: user.role // Include user's role in response
        });

    } catch (error) {
        console.error('Login error:', error); // Log the error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { register, login }