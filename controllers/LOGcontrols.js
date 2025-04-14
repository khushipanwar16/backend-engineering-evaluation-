const fs = require('fs');
const bcrypt = require('bcrypt'); // For password hashing
const usersFile = './data/users.json'; // Path to the users data file

// Handle the login logic
const postlogin = (req, res) => {
    const { uname, upwd } = req.body;

    fs.readFile(usersFile, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            return res.render('login', { errorMessage: 'Internal server error. Please try again later.' }); // Pass error to login page
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.uname === uname);

        if (!user) {
            return res.render('login', { errorMessage: 'User not found. Please check your username or register.' }); // Pass error to login page
        }

        bcrypt.compare(upwd, user.upwd, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.render('login', { errorMessage: 'Something went wrong. Please try again.' }); // Pass error to login page
            }

            if (!isMatch) {
                return res.render('login', { errorMessage: 'Incorrect password. Please try again.' }); // Pass error to login page
            }

            // Render the success page after login
            res.render('success', { dashboardLink: '/dashboard' });
        });
    });
};

// Handle the registration logic
const postregister = (req, res) => {
    const { uname, upwd } = req.body;

    // Check if the username already exists
    fs.readFile(usersFile, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            return res.render('register', { errorMessage: 'Internal server error. Please try again later.' }); // Pass error to register page
        }

        let users;
        try {
            users = JSON.parse(data); // Parse the users data
        } catch (parseErr) {
            console.error('Error parsing users file:', parseErr);
            return res.render('register', { errorMessage: 'Internal server error. Please try again later.' }); // Pass error to register page
        }

        // Check if the username already exists
        if (users.find(user => user.uname === uname)) {
            return res.render('register', { errorMessage: 'Username already exists. Please choose another.' }); // Pass error to register page
        }

        // Hash the password before saving
        bcrypt.hash(upwd, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.render('register', { errorMessage: 'Something went wrong. Please try again.' }); // Pass error to register page
            }

            // Create a new user object
            const newUser = { uname, upwd: hashedPassword };

            // Add the new user to the users array
            users.push(newUser);

            // Save the updated array to the file
            fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error('Error saving users file:', err);
                    return res.render('register', { errorMessage: 'Something went wrong. Please try again.' }); // Pass error to register page
                }

                // Render the success page after successful registration
                res.render('success', { dashboardLink: '/' });
            });
        });
    });
};

module.exports = { postlogin, postregister };
