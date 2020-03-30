'use strict';

const User = require('../models/user');
const service = require('../services/jwt');
const bcrypt = require('bcrypt-nodejs');

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });
    // user.validateSync();
    user.save((err) => {
        if (err) return res.status(500).send({ message: `Error to create user: ${err}` });

        return res.status(201).send({ token: `Bearer ${service.createToken(user)}` })
    })
}

function signIn(req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ message: err });
        if (!user) return res.status(403).send({ message: 'Email or password incorrect' });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) res.status(500).send({message: 'Internal Server Error'});
            if (isMatch){
                req.user = user;
                res.status(200).send({
                    message: 'Successfully logged in',
                    token: `Bearer ${service.createToken(user)}`
                })
            }else {
                res.status(403).send({message: 'Email or password incorrect'})
            }
        });
    })
}

module.exports = {
    signUp: signUp,
    signIn: signIn
};
