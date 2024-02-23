// // UserController.js

// const User = require('../models/userModel'); // Assuming you have a User model defined

// // Controller function to retrieve a user profile
// const getProfile = async (req, res) => {
//   try {

//     // Retrieve the user ID from the request parameters
//     const username = req.params.username;
//     // Query the database to find the user by ID
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // If user found, return the user profile data
//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// module.exports = { getProfile };
