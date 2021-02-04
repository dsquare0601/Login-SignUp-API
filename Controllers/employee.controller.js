const Employee = require("../models/employee.model");
const log = require("../Logger");

exports.addEmployee = async (req, res) => {
  const { EmpId, Name, Designation, Department, Salary } = req.body;

  if (!EmpId || !Name || !Designation || !Department || !Salary)
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
  }

  try {
    await checkForEmpId(EmpId);

    const emp = new Employee({
      EmpId: EmpId,
      Name: Name,
      Designation: Designation,
      Department: Department,
      Salary: Salary,
    });

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

  if (data || data.length > 0)
    throw new Error("Employee already exist with this EmpId!");
  return data;
}

exports.GetEmployee = async (req, res) => {
  const cb = { req, res };
  const params = req.query;
  let { page, limit } = req.query;

  limit = limit ? limit : 5;
  page = page ? page : 1;

  const { EmpId, Name, Designation, Department, Salary } = params;

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

exports.Pagination = async (req, res) => {
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
