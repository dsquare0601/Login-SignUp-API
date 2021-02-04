module.exports = (app) => {
  const Employee = require("../Controllers/employee.controller");

  app.post("/addemp", Employee.addEmployee); 

  app.get("/getemp", Employee.GetEmployee); 

  app.get("/pagination", Employee.Pagination); 
};
