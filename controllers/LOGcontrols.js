const fs = require('fs');
const bcrypt = require('bcrypt'); // Assuming you're using bcrypt for password hashing
const usersFile = './data/users.json'; // Path to the users data

// Handle the login logic
const postlogin = (req, res) => {
    const { uname, upwd } = req.body;

    fs.readFile(usersFile, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            return res.render('failed', { errorMessage: 'Internal server error. Please try again later.' });
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.uname === uname);

        if (!user) {
            return res.render('failed', { errorMessage: 'User not found. Please check your username or register.' });
        }

        bcrypt.compare(upwd, user.upwd, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.render('failed', { errorMessage: 'Something went wrong. Please try again.' });
            }

            if (!isMatch) {
                return res.render('failed', { errorMessage: 'Incorrect password. Please try again.' });
            }

            // Since no session is being used, we can just render the success page directly
            res.render('success', { dashboardLink: '/dashboard' });
        });
    });
};

// Handle the registration logic (assuming you're adding registration logic here as well)
const postregister = (req, res) => {
    const { uname, upwd } = req.body;

    // Check if the username already exists
    fs.readFile(usersFile, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            return res.status(500).send('Server Error');
        }

        let users;
        try {
            users = JSON.parse(data); // Parse the JSON data
        } catch (parseErr) {
            console.error('Error parsing users file:', parseErr);
            return res.status(500).send('Server Error');
        }

        if (users.find(user => user.uname === uname)) {
            // If the username already exists, render the failed page
            return res.render('failed', { errorMessage: 'Username already exists. Please choose another.' });
        }

        // Hash the password before saving
        bcrypt.hash(upwd, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).send('Server Error');
            }

            // Create a new user object
            const newUser = { uname, upwd: hashedPassword };

            // Add the new user to the users list
            users.push(newUser);

            // Save the updated users array to the file
            fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error('Error saving users file:', err);
                    return res.status(500).send('Server Error');
                }

                // Render success page with registration confirmation
                res.render('success', { dashboardLink: '/' });
            });
        });
    });
};

// Export controller functions
module.exports = { postlogin, postregister };
