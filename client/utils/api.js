import $ from 'jquery';

const api = {
  login(username, password) {
    const user = { username, password };
    return $.post('/login', user)
      .fail(() => {
        if (!$('#errorMsg').length) {
          return $('#accountLogin').append('<p id="errorMsg">Incorrect username or password</p>');
        }
        return null;
      });
  },

  signup(username, password) {
    const user = { username, password };
    return $.post('/signup', user)
      .fail(() => {
        if (!$('#errorMsg').length) {
          return $('#createAccount').append('<p id="errorMsg">User already exists</p>');
        }
        return null;
      });
  },

  changePassword(username, password, newPassword) {
    const user = { username, password, newPassword };
    return $.post('/changePassword', user);
  },

  changeUsername(username, newUsername) {
    const user = { username, newUsername };
    return $.post('/changeUsername', user);
  },

  getDefs(word, callback) {
    const url = `/dictionary/${word}`;

    return $.get(url, 'json')
      .done((data) =>
        callback(null, data)
      )
      .fail((err) =>
        callback(err)
      );
  },

  getSyns(word, callback) {
    const url = `/thesaurus/${word}`;

    return $.get(url, 'json')
      .done((data) =>
        callback(null, data)
      )
      .fail((err) =>
        callback(err)
      );
  },
};

module.exports = api;
