 const Users = require('../models/user.model');
 const jwt = require('jsonwebtoken');
 const SECRET = 'VkVSWV9TRUNSRVRfS0VZIQ==';
 
 exports.signup = (req, res) => {
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

exports.login = (req, res) => {
    if (!(req.body.email || req.body.password)) {
        return res.status(400).send({
            message: "Please Fill up Users Details"
        });
    }

    Users.find({ $and: [{ email: req.body.email }, { password: req.body.password }] })
        .then(data => {
            if (data.length > 0) {
                const user = {
                    'email': data[0]['email']
                };

                const token = jwt.sign(user, SECRET, { expiresIn: "24H" })
                res.json({ token: token });
            }
            else {
                res.status(500).send({ message: "Data Not Found" });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};
