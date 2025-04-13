const bcrypt = require('bcryptjs'); // For password hashing
const fs = require('fs');

// Utility function to hash passwords
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt with a cost factor of 10
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

// Utility function to check if passwords match
const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword); // Compare password with hash
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
};

// Utility function to check if a user already exists (for registration)
const userExists = (username) => {
    // Read the user data from your file (or database)
    const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
    
    // Check if a user with the given username exists
    const user = users.find(u => u.username === username);
    return user ? true : false;
};

// Utility function to save a new user to your storage (file/database)
const saveUser = (newUser) => {
    const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8')); // Read current users
    users.push(newUser); // Add the new user to the users array
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2)); // Save updated users back to file
};

// Utility function to generate error messages
const generateErrorMessage = (message) => {
    return `<div class="error-message">
                <p>${message}</p>
            </div>`;
};

// Utility function to generate success messages
const generateSuccessMessage = (message) => {
    return `<div class="success-message">
                <p>${message}</p>
            </div>`;
};

module.exports = {
    hashPassword,
    comparePassword,
    userExists,
    saveUser,
    generateErrorMessage,
    generateSuccessMessage
};
