/* eslint new-cap: 0 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Q = require('q');

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: String,
});

UserSchema.methods.comparePasswords = function (candidatePassword) {
  const savedPassword = this.password;
  return Q.Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, savedPassword, (err, matched) => {
      if (err) {
        reject(err);
      } else {
        resolve(matched);
      }
    });
  });
};

UserSchema.pre('save', function presaveCallback(next) {
  const user = this;
  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    return bcrypt.hash(user.password, salt, null, (err2, hash) => {
      if (err2) {
        return next(err2);
      }
      user.password = hash;
      user.salt = salt;
      return next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
