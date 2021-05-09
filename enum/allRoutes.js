import { resetPassword } from "../Controllers/user.controller";

export default {
  EmpRoutes: {
    AddEmp: "/addemp",
    Login: "/emplogin",
    GetEmpWithCondition: "/getemp",
    GetAllEmp: "/getallemp",
    GetByPageLimit: "/pagination",
  },
  User: {
    SignUp:'/signup',
    Login:'/login',
    ForgotPassword:'/forgot-password',
    ResetPassword:'/reset-password',
  },
};
