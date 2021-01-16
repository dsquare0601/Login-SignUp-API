module.exports = (app) => {
    const users = require('../controllers/user.controller');

    app.post('/signup', users.signup);

    app.post('/login', users.login);
}