const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/Users');
users.use(cors());

process.env.SECRET_KEY = 'secret123456789';

// Register
users.post('/register', (req, res) => {
    const today = new Date();
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today,
        update_time: today
    }

    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                const hash = bcrypt.hashSync(userData.password, 10);
                userData.password = hash;
                User.create(userData)
                    .then(user => {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, { expiresIn: 1440 });
                        res.json({ token: token });
                    })
                    .catch(err => {
                        res.send(`Error: ${err}`);
                    })
            } else {
                res.json({
                    error: `User already exists.`
                });
            }
        })
        .catch(err => {
            res.send(`Error: ${err}`);
        })
});

// Login
users.post('/login', (req, res) => {
    User.findOne({
            where: {
                email: req.body.email,
            }
        })
        .then(user => {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token })
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('Error: ' + err)
        })
});

// Profile
users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    User.findOne({
            where: {
                id: decoded.id
            }
        })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.send('User does not exist');
            }
        })
        .catch(err => {
            res.send(`Error in profile: ` + err);
        });
})

module.exports = users;