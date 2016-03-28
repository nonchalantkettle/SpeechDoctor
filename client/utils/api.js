import $ from 'jquery';

const api = {
  login(username, password) {
    const user = { username, password };
    return $.post('http://localhost:8080/login', user);
  },
  signup(username, password) {
    const user = { username, password };
    return $.post('http://localhost:8080/signup', user);
  },
  changePassword(username, password, newPassword) {
    const user = { username, password, newPassword };
    return $.post('http://localhost:8080/changePassword', user);
  },
  changeUsername(username, newUsername) {
    const user = { username, newUsername };
    return $.post('http://localhost:8080/changeUsername', user);
  },
};

module.exports = api;
