import { routesLink } from "../enum/index";
const Route = routesLink.User;

module.exports = (app) => {
    const users = require('../Controllers/user.controller');

    /**
     * @swagger
     * /signup:
     *  post:
     *      description: Use To Create Account
     */
    app.post(Route.SignUp, users.signup);

    /**
     * @swagger
     * /login:
     *  post:
     *      description: Use To Login Into Account
     */
    app.post(Route.Login, users.login);

    /**
     * @swagger
     * /forgot-password:
     *  put:
     *      description: Use To Get Special Generated Token To Use Into Reset Password API's Body.
     */
    app.put(Route.ForgotPassword, users.forgotPassword);

    /**
     * @swagger
     * /reset-password:
     *  put:
     *      description: Use To Reset Password.
     */
    app.put(Route.ResetPassword, users.resetPassword);
}