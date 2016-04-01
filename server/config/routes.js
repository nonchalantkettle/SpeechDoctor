const path = require('path');

const userController = require('../db/userController.js');
const api = require('../db/apiController.js');

module.exports = (app) => {
  // Sign in and sign up routes
  app.post('/login', userController.login);
  app.post('/signup', userController.signup);

  // Change user information
  app.post('/changePassword', userController.changePassword);
  app.post('/changeUsername', userController.changeUsername);

  // Receive text from user to insert in database
  app.put('/text', userController.storeText);
  app.put('/speech', userController.storeSpeech);

  // Get text for profile analytics
  app.get('/text', userController.getText);
  app.get('/speech', userController.getSpeech);

  // Route dictionary and thesaurus api calls
  app.get('/dictionary/:word', api.dictionary);
  app.get('/thesaurus/:word', api.thesaurus);

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public', 'index.html'));
  });
};
