const userController = require('../db/userController.js');

module.exports = (app) => {
  // Sign in and sign up routes
  app.post('/login', userController.login);
  app.post('/signup', userController.signup);
  app.get('/checkJWT/:JWT', userController.checkJWT);

  // Change user information
  app.post('/changePassword', userController.changePassword);
  app.post('/changeUsername', userController.changeUsername);

  // Receive text from user to insert in database
  app.put('/text', userController.storeText);
  // app.post('/speech', userController./*METHOD GOES HERE*/);
};
