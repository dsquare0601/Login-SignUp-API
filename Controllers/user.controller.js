 const Users = require('../models/user.model');

 exports.create = (req, res) => {
    if (!(req.body.email || req.body.password)) {
        return res.status(400).send({
            message: "Please Fill Up Users Details!"
        });
    } else if(req.body.password !== req.body.confirmPassword) {
        return res.status(400).send({
            message: "Please Enter Same Password!"
        });
    }

    const users = new Users({
        email: req.body.email,
        password: req.body.password
    });

    users.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
