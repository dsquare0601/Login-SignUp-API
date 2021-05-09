import { routesLink } from "../enum/index";
const AuthGuard = require("../Authentication/authentication");
const Route = routesLink.EmpRoutes;

module.exports = (app) => {
  const Employee = require("../Controllers/employee.controller");

  app.post(Route.AddEmp, Employee.addEmployee);

  app.post(Route.Login, Employee.login);

  app.get(Route.GetAllEmp, AuthGuard, Employee.GetAllEmployees);

  app.get(Route.GetEmpWithCondition, AuthGuard, Employee.GetEmployee);

  app.get(Route.GetByPageLimit, AuthGuard, Employee.Pagination);
};
