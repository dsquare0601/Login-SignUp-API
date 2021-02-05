import { routesLink } from "../enum/index";
const Route = routesLink.EmpRoutes;

module.exports = (app) => {
  const Employee = require("../Controllers/employee.controller");

  app.post(Route.AddEmp, Employee.addEmployee);

  app.post(Route.Login, Employee.login);

  app.get(Route.GetAllEmp, Employee.GetAllEmployees);

  app.get(Route.GetEmpWithCondition, Employee.GetEmployee);

  app.get(Route.GetByPageLimit, Employee.Pagination);
};
