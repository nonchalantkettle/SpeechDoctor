import $ from 'jquery';

const api = {
  login(username, password) {
    const user = { username, password };
    return $.post('http://localhost:8080/login', user)
      .fail(() => {
        if (!$('#errorMsg').length) {
          return $('#accountLogin').append('<p id="errorMsg">Incorrect username or password</p>');
        }
        return null;
      });
  },
  signup(username, password) {
    const user = { username, password };
    return $.post('http://localhost:8080/signup', user)
      .fail(() => {
        if (!$('#errorMsg').length) {
          return $('#createAccount').append('<p id="errorMsg">User already exists</p>');
        }
        return null;
      });
  },
  changePassword(username, password, newPassword) {
    const user = { username, password, newPassword };
    return $.post('http://localhost:8080/changePassword', user);
  },
  changeUsername(username, newUsername) {
    const user = { username, newUsername };
    return $.post('http://localhost:8080/changeUsername', user);
  },
  checkJWT(JWT, callback) {
    const url = 'http://localhost:8080/checkJWT/' + JWT;
    return $.get(url, user, 'json')
      .done((data) => callback(data._bodyInit))
      .fail((err) => err);
  },
  getDefs(word, callback) {
    const url = 'http://localhost:8080/dictionary/' + word;

    return $.get(url, 'json')
      .done((data) => {
        return callback(null, data);
      })
      .fail((err) => {
        return callback(err);
      });
  },
  getSyns(word, callback) {
    const url = 'http://localhost:8080/thesaurus/' + word;

    return $.get(url, 'json')
      .done((data) => {
        return callback(null, data);
      })
      .fail((err) => {
        return callback(err);
      });
  },
};

module.exports = api;
