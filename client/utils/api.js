import $ from 'jquery';

const api = {
  login(username, password) {
    const user = { username: username, password: password };
    return $.post('http://localhost:8080/login', user);
  },
  signup(username, password) {
    const user = { username: username, password: password };
    return $.post('http://localhost:8080/signup', user);
  },
  changePassword(username, password, newPassword) {
    const user = { username: username, password: password, newPassword: newPassword };
    return $.post('http://localhost:8080/changePassword', user);
  },
  changeUsername(username, newUsername) {
    const user = { username: username, newUsername: newUsername };
    return $.post('http://localhost:8080/changeUsername', user);
  },
  checkJWT(JWT, callback) {
    const url = 'http://localhost:8080/checkJWT:' + JWT;
    return $.get(url, user, 'json')
      .done((data) => callback(data._bodyInit))
      .fail((err) => err);
  },
};

module.exports = api;
