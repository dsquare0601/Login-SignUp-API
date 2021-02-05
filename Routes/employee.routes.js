import { routesLink } from "../enum/index";
const route = routesLink.EmpRoutes;

module.exports = (app) => {
  const Employee = require("../Controllers/employee.controller");

  app.post(route.AddEmp, Employee.addEmployee);

  app.post(route.Login, Employee.login);

  app.get(route.GetAllEmp, Employee.GetAllEmployees);

  app.get(route.GetEmpWithCondition, Employee.GetEmployee);

  app.get(route.GetByPageLimit, Employee.Pagination);
};
