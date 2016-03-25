const Q = require('q');
const User = require('./userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const findUser = Q.nbind(User.findOne, User);
const createUser = Q.nbind(User.create, User);

module.exports = {
  login: (req, res, next) => {
    console.log(" REQ DOT BODY - ", req.body);
    const user = req.body;
    const username = user.username;
    const password = user.password;

    findUser({ username: username })
      .then((user) => {
        if (!user) {
          return next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then((foundUser) => {
              if (foundUser) {
                const token = jwt.sign({ username: username, userId: user._id },'HiImAJWTTokenSecret');
                return res.json({ userId: user._id, token: token });
              } else {
                return next(new Error('Incorrect username or password'));
              }
            });
        }
      })
      .fail((error) => {
        return next(error);
      });
  },

  signup: (req, res, next) => {
    const user = req.body;
    const username = user.username;
    const password = user.password;

    findUser({ username: username })
      .then((user) => {
        if (user) {
          return next(new Error('User already exists'));
        } else {
          createUser({
            username: username,
            password: password
          }).then((user) => {
            console.log('Created user', user);
              // Generate JWT for user here
              // params: payload, secret key, encryption, callback
            const token = jwt.sign({ username: user.username, userId: user._id }, 'HiImAJWTTokenSecret');
            console.log('token created', token);
            res.json({ token: token, userId: user._id, username: user.username });
            return next();
          }).catch((err) => {
            console.error('problem creating user', err);
          });
        }
      })
      .fail((error) => {
        return next(error);
      });
  },

  checkJWT: (req, res, next) => {
    console.log('Looking for JWT', req.params.JWT);
    const decoded = jwt.verify(req.params.JWT, 'HiImAJWTTokenSecret', (err, decoded) => {
      if (err) {
        console.log('Error decoded JWT', err);
      } else {
        // send back decoded.userId and decoded.username
        res.json({ username: decoded.username, userId: decoded.userId });
        return next();
      }
    });
  },

  changePassword: (req, res, next) => {
    const user = req.body;
    const username = user.username;
    const password = user.password;
    const newPassword = user.newPassword;

    findUser({ username: username })
      .then((user) => {
        if (!user) {
          return next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then((foundUser) => {
              user.password = newPassword;
              user.save((err, savedUser) => {
                if (err) {
                  return next(err);
                }
                return res.json();
              });
            }).catch((err) => {
              console.error('Problem changing password', err);
              return err;
            });
        }
      })
      .fail((error) => {
        return next(error);
      });
  },

  changeUsername: (req, res, next) => {
    const user = req.body;
    const username = user.username;
    const newUsername = user.newUsername;

    findUser({ username: username })
      .then((user) => {
        if (!user) {
          return next(new Error('User does not exist'));
        } else {
          user.username = newUsername;
          user.save((err, savedUser) => {
            if (err) {
              return next(err);
            }
            return res.json({ username: savedUser.username });
          });
        }
      })
      .fail((error) => {
        return next(error);
      });
  },
};
