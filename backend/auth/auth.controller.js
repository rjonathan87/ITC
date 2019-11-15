const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRETKEY = 'secretkey123456';

//método para crear usuarios
exports.createUser = (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    }

    User.create(newUser, (err, user) => {
        if (err && err.code === 11000) return res.status(409).send('Email already exists');
        if (err) return res.status(500).send('Server error');

        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
            SECRETKEY, { expiresIn: expiresIn }
        );

        const dataUser = {
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }

        // response
        res.send({ dataUser });
    });
}

exports.loginUser = (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({ email: userData.email }, (err, user) => {
        //  si hay error
        if (err) return res.status(500).send('Server error!!!');

        // no existe el usuario
        if (!user) {
            res.status(409).send({ message: 'Algo ha salido mal!!!' })
        } else {
            const resultPassword = bcrypt.compareSync(userData.password, user.password);

            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: user.id }, SECRETKEY, { expiresIn: expiresIn });

                const dataUser = {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }

                res.send({ dataUser });
            } else {
                //  Contraseña incorrecta
                res.status(409).send({ message: 'Algo ha salido mal!!!' });
            }
        }
    });
}