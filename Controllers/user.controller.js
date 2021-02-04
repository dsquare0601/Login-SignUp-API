const Users = require("../models/user.model");
const log = require("../Logger");
const { LocalURL } = require("../Config/dbConfig");
const jwt = require("jsonwebtoken");
//const mailgun = require('mailgun-js');
const _ = require("lodash");
//const mg = mailgun({ apiKey: APIKey, domain: DomainName });
const SECRET = "VkVSWV9TRUNSRVRfS0VZIQ==";

exports.signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!(email || password)) {
    return res.status(400).send({
      success: false,
      message: "Please Fill Up Users Details!",
    });
  } else if (password !== confirmPassword) {
    return res.status(400).send({
      success: false,
      message: "Please Enter Same Password!",
    });
  }

  const users = new Users({
    email: email,
    password: password,
  });

  try {
    const data = await Users.find({ email: email });
    console.log(data);

    if (data.length > 0) {
      res.status(200).json({
        success: false,
        message: "User Already Exist.",
      });
    } else {
      console.log("Before call");
      var cb = { req, res };
      await saveUser(users, cb);
      console.log("After call");
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

async function saveUser(users, cb) {
  var { req, res } = cb;
  console.log("Before save call");

  try {
    const data = await users.save();
    if (data) {
      log.info("User Added Successfully.");
      res.status(200).send({
        success: true,
        data: data,
      });
    }
    console.log(data);
  } catch (err) {
    log.error(err.message);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
  console.log("After save call");
}

exports.login = async (req, res) => {
  if (!(req.body.email || req.body.password)) {
    return res.status(400).send({
      success: false,
      message: "Please Fill up Users Details",
    });
  }

  try {
    const data = await Users.find({
      $and: [{ email: req.body.email }, { password: req.body.password }],
    });

    if (data.length > 0) {
      const user = {
        email: data[0]["email"],
      };

      const token = jwt.sign(user, SECRET, { expiresIn: "24H" });
      log.info("Token returned for user login");
      res.json({ success: true, token: token });
    } else {
      log.info("Data not found for login");
      res.status(500).send({ success: true, message: "Data Not Found" });
    }
  } catch (err) {
    log.error(err.message);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  Users.findOne({ email: email }, (err, data) => {
    if (err || !data) {
      return res.status(400).send("User Not found with this email");
    }

    const token = jwt.sign({ _id: data._id }, SECRET, { expiresIn: "20m" });

    //Mail Options Currently disabled
    const mailOptions = {
      from: "noreply@dsquare.com",
      to: email,
      subject: "Forgot Password Link",
      html: `
                <h2>Please click below link to reset your password.</h2>
                <h4>Use the token string which is placed after '.../resetPassword/'.</h4>
                <p>${LocalURL}/resetPassword/${token}</p>
            `,
    };

    return data.updateOne({ resetLink: token }, (err, success) => {
      if (err) {
        return res.status(400).send("Reset Password Link Error.!");
      } else {
        return res.status(200).send({
          message:
            "Copy the Below Token String For Use In Reset Password API\n",
          token: token,
        });
        //Sending In Email
        /*
        mg.messages().send(mailOptions, function(err, body){
            if(err) {
                return res.send(err.message);
            }
            return res.status(200).send("Email has bee sent, kindly check in spam folder.!")
        });
        */
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetLink, newPass } = req.body;

  if (resetLink) {
    jwt.verify(resetLink, SECRET, function (err, data) {
      if (err) {
        return res.send("Incorrect Token or It Is Expired.");
      }

      Users.findOne({ resetLink }, (err, data) => {
        if (err || !data) {
          return res.status(400).send("User with this token does not exist.");
        }

        const pass = {
          password: newPass,
        };

        data = _.extend(data, pass);
        data.save((err, data) => {
          if (err) {
            return res.status(400).send("Reset Password Error");
          } else {
            return res.status(200).send("Your Password has been sent!");
          }
        });
      });
    });
  } else {
    return res.status(400).send("Error Occured!!!");
  }
};
