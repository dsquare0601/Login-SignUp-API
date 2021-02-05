const jwt = require("jsonwebtoken");
const SECRET = "VkVSWV9TRUNSRVRfS0VZIQ==";

const AuthGuard = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (authorization) {
      const token = authorization.split(" ")[1];
      if (token == undefined || token == null)
        throw new Error("Invalid Authorization Token");

      await jwt.verify(token, SECRET);
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access or Invalid Authorization Token",
      });
    }
  } catch (err) {
    return res.status(401).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = AuthGuard;
