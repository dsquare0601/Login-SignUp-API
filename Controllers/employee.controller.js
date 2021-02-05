import validateSchema from "../middleware/validateSchema";
const Employee = require("../models/employee.model");
const log = require("../Logger");
const empSchema = validateSchema.empSchema;
const empLoginSchema = validateSchema.empLoginSchema;
const { BaseURL } = require("../Config/dbConfig");
const jwt = require("jsonwebtoken");
//const mailgun = require('mailgun-js');
const _ = require("lodash");
const SECRET = "VkVSWV9TRUNSRVRfS0VZIQ==";

exports.addEmployee = async (req, res, next) => {
  /*  if (!EmpId || !Name || !Designation || !Department || !Salary)
    return res.status(400).json({
      success: false,
      message: "Please Fill Up Data!",
    });

  for (let val in req.body) {
    if (!val || val === null || val === " ")
      return res.status(400).json({
        success: false,
        message: "Please Fill Up Data!",
      });
  } */

  try {
    const {
      EmpId,
      Name,
      Email,
      Designation,
      Department,
      Salary,
      Password,
    } = req.body;

    const emp = new Employee({
      EmpId: parseInt(EmpId),
      Name: Name,
      Email: Email,
      Password: Password,
      Designation: Designation,
      Department: Department,
      Salary: parseInt(Salary),
    });

    await empSchema.validateAsync(req.body);
    // consoloe.log(result);

    await checkForEmpId(EmpId);
    await checkForEmail(Email);

    const data = await emp.save();
    if (!data || data.length === 0) throw new Error("Employee not saved!");

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

async function checkForEmpId(id) {
  const data = await Employee.find({ EmpId: id });

  if (data.length > 0) throw new Error("EmpId already used!");
  return data;
}

async function checkForEmail(email) {
  const data = await Employee.find({
    Email: { $regex: new RegExp(email, "i") },
  });

  if (data.length > 0) throw new Error("Email already used!");
  return data;
}

exports.login = async (req, res, next) => {
  const { Email, Password } = req.body;

  /* 
  if (!(req.body.email || req.body.password)) {
    return res.status(400).send({
      success: false,
      message: "Please Fill up Users Details",
    });
  } */

  try {
    await empLoginSchema.validateAsync(req.body);

    const data = await Employee.find({
      $and: [
        { Email: { $regex: new RegExp(Email, "i") } },
        { Password: Password },
      ],
    });

    if (data.length > 0) {
      const user = {
        email: data[0]["email"],
      };

      const token = jwt.sign(user, SECRET, { expiresIn: "24H" });
      log.info("Token returned for user login");
      res.json({ success: true, token: token });
    } else {
      log.info(`User not found for login with ${Email}`);
      res
        .status(400)
        .send({ success: true, message: "Wrong Email and Password Entered!" });
    }
  } catch (err) {
    log.error(err.message);
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

exports.GetAllEmployees = async (req, res, next) => {
  try {
    const data = await Employee.find();

    if (!data || data.length === 0) throw new Error("Employee not found!");
    console.log("exit from api add");

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

exports.GetEmployee = async (req, res, next) => {
  const { EmpId, Name, Designation, Department, Salary } = req.query;
  let { page, limit } = req.query;
  
  limit = limit ? limit : 5;

  if (page <= 0) {
    return res
      .status(400)
      .send({ Success: false, message: "Page can't be zero or negative" });
  }
  page = page ? page : 1;

  const filter = {
    $or: [
      { EmpId: EmpId ? parseInt(EmpId) : EmpId },
      { Name: Name },
      { Designation: Designation },
      { Department: Department },
      { Salary: Salary ? parseInt(Salary) : Salary },
    ],
  };
  try {
      const data = await Employee.aggregate([
        {
          $match: filter,
        },
        {
          $facet: {
            metadata: [{ $count: "total" }],
            data: [{ $skip: (page - 1) * limit }, { $limit: limit * 1 }],
          },
        },
      ]);

      //console.log(data);

      /* const data = await Employee.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit); */

      //const count = await Employee.find(filter).countDocuments();

      if (!data || data.length === 0) throw new Error("Employee not found!");

      return res.status(200).json({
        success: true,
        totalRecords: data[0].metadata[0] ? data[0].metadata[0].total : 0,
        totalPages: data[0].metadata[0]
          ? Math.ceil(data[0].metadata[0].total / limit)
          : 0,
        currentPage: page,
        data: data[0].data,
      });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

//Work Only With Two Query : limit, page
exports.Pagination = async (req, res, next) => {
  let { page, limit } = req.query;

  limit = limit ? limit : 5;
  page = page ? page : 1;

  try {
    const emp = await Employee.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Employee.countDocuments();

    res.json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: emp,
    });
  } catch (err) {
    res.status(400).send({ Success: false, message: err.message });
  }
};
