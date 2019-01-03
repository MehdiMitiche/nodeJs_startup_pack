const mongoose = require('mongoose')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const passport = require('passport')

//CRUD OPERATIONS
const getUser = (req, res) => {
    const query = {}
    User.find(query, (err, users) => {
        res.json({ users })
    })
}

const addUser = (req, res) => {

}

const updateUser = (req, res) => {

}

const deleteUser = (req, res) => {

}

const register = (req, res) => {
    req.checkBody('username', 'The username is required').notEmpty();
    req.checkBody('email', 'The email is required').notEmpty();
    req.checkBody('password', 'The password is required').notEmpty();
    req.checkBody('passwordConf', "Password don't match").equals(req.body.password);


    const err = req.validationErrors()

    if (err) {
        res.json({
            err: err[0].msg
        })
    } else {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        }
        const newUser = new User(userData)
        newUser.save((err, user) => {

            if (err) {
                res.json({
                    err: 'Error saving User'
                })
            } else {
                res.json({
                    user
                })
            }
        })
    }
}
const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err) }
        if (!user) {
            res.json({
                msg: 'user Not Find'
            })
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }

            const userData = {
                id: user._id,
                username: user.username,
                password: user.password,
                user: true
            }

            //Creating the Token
            jwt.sign(userData, 'SecretKeyHere', {
                expiresIn: '1h'
            }, (err, token) => {
                if (err) {
                    console.log('no Err')
                    res.json({
                        err: err
                    })
                } else {
                    res.json(token)
                }
            })
        });
    })(req, res, next)
}

module.exports = {
    getUser,
    addUser,
    updateUser,
    deleteUser,
    register,
    login
}