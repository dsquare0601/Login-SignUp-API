module.exports = (app) => {
    const users = require('../Controllers/user.controller');

    /**
     * @swagger
     * /signup:
     *  post:
     *      description: Use To Create Account
     */
    app.post('/signup', users.signup);

    /**
     * @swagger
     * /login:
     *  post:
     *      description: Use To Login Into Account
     */
    app.post('/login', users.login);

    /**
     * @swagger
     * /forgot-password:
     *  put:
     *      description: Use To Get Special Generated Token To Use Into Reset Password API's Body.
     */
    app.put('/forgot-password', users.forgotPassword);

    /**
     * @swagger
     * /reset-password:
     *  put:
     *      description: Use To Reset Password.
     */
    app.put('/reset-password', users.resetPassword);
}