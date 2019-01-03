const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const User = require('../models/User');


module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
        const query = { username: username };
        User.findOne(query, (err, user) => {
           // if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'User not found' })
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (!isMatch) {
                    return done(null, false, { message: 'Wrong Password' })
                } else {
                    return done(null, user)
                }
            })
        })
    }))

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

}