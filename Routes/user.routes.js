module.exports = (app) => {
    const users = require('../controllers/user.controller');

    app.post('/signup', users.signup);

    app.post('/login', users.login);

    app.put('/forgot-password', users.forgotPassword);

    app.put('/reset-password', users.resetPassword);
}