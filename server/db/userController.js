/* eslint no-param-reassign: 0 */
const Q = require('q');
const User = require('./userModel');
const jwt = require('jsonwebtoken');

const findUser = Q.nbind(User.findOne, User);
const createUser = Q.nbind(User.create, User);
const updateUser = Q.nbind(User.findOneAndUpdate, User);

module.exports = {
  login: (req, res, next) => {
    const user = req.body;
    const username = user.username;
    const password = user.password;

    findUser({ username })
      .then((foundUser) => {
        if (!foundUser) {
          return next(new Error('User does not exist'));
        }
        return foundUser.comparePasswords(password)
          .then((confirmedUser) => {
            if (confirmedUser) {
              const token = jwt.sign({ username, userId: user._id },
                'HiImAJWTTokenSecret');
              return res.json({ userId: user._id, token });
            }
            return next(new Error('Incorrect username or password'));
          });
      })
      .fail((error) =>
        next(error)
      );
  },

  signup: (req, res, next) => {
    const user = req.body;
    const username = user.username;
    const password = user.password;

    findUser({ username })
      .then((foundUser) => {
        if (foundUser) {
          return next(new Error('User already exists'));
        }
        return createUser({
          username,
          password,
        })
        .then((createdUser) => {
          const token = jwt.sign({ username: createdUser.username, userId: createdUser._id },
            'HiImAJWTTokenSecret');
          res.json({ token, userId: createdUser._id, username: createdUser.username });
          return next();
        })
        .catch((err) => {
          throw new Error('There was an error signing up', err);
        });
      })
      .fail((error) =>
        next(error)
      );
  },

  checkJWT: (req, res, next) => {
    jwt.verify(req.params.JWT, 'HiImAJWTTokenSecret', (err, decoded) => {
      if (err) {
        throw new Error('Error decoding JWT', err);
      }
      res.json({ username: decoded.username, userId: decoded.userId });
      return next();
    });
  },

  changePassword: (req, res, next) => {
    const user = req.body;
    const username = user.username;
    const password = user.password;
    const newPassword = user.newPassword;

    findUser({ username })
      .then((foundUser) => {
        if (!foundUser) {
          return next(new Error('User does not exist'));
        }
        return foundUser.comparePasswords(password)
          .then(() => {
            foundUser.password = newPassword;
            foundUser.save((err) => {
              if (err) {
                return next(err);
              }
              return res.json();
            });
          })
          .catch((err) => {
            throw new Error('Problem changing password', err);
          });
      })
     .fail((error) => next(error));
  },

  changeUsername: (req, res, next) => {
    const user = req.body;
    const username = user.username;
    const newUsername = user.newUsername;

    findUser({ username })
      .then((foundUser) => {
        if (!foundUser) {
          return next(new Error('User does not exist'));
        }
        foundUser.username = newUsername;
        return foundUser.save((err, savedUser) => {
          if (err) {
            return next(err);
          }
          return res.json({ username: savedUser.username });
        });
      })
      .fail((error) => next(error));
  },

  storeText: (req, res) => {
    const update = { $push: { textViewText: req.body.textViewText } };
    const user = req.body.user;
    updateUser({ username: user }, update, { new: true, upsert: true })
    .then((found) => {
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).send('Could not update text');
      }
    });
  },

  // storeSpeech: (req, res, next) => {
  // }

};
