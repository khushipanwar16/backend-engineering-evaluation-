const path = require('path');
const fs = require('fs');

const usersFile = path.join(__dirname, '../data/user.json');

// Serve login page
const getlogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
};

// Handle user login
const postlogin = (req, res) => {
    const { uname, upwd } = req.body;

    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    const user = users.find(user => user.uname === uname);

    if (!user || user.upwd !== upwd) {
        return res.sendFile(path.join(__dirname, '../public/failed.html'));
    }

    res.redirect('/');
};

// Serve register page
const getregister = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
};

// Handle user registration
const postregister = (req, res) => {
    const { uname, upwd } = req.body;

    if (!uname || !upwd) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));

    if (users.find(user => user.uname === uname)) {
        return res.status(400).json({ success: false, message: 'Username already exists.' });
    }

    users.push({ uname, upwd });
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res.status(201).json({ success: true, message: 'Registration successful!' });
};

module.exports = { getlogin, postlogin, getregister, postregister };
