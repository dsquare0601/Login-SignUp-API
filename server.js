const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//create express app
const app = express();
const PORT = 3000 || Process.ENV.PORT;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Signup, Login And Change Password API",
      description: "Basic Signup, Login And Change Password REST APIs",
      contact: {
        name: "Dsquare",
      },
      servers: ["http://localhost:" + PORT],
    },
  },
  apis: ["./Routes/user.routes.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//configuring the database
const dbConfig = require("./Config/dbConfig");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("Welcome To Test API.");
});

require("./Routes/user.routes")(app);
require("./Routes/employee.routes")(app);

app.listen(PORT, () => {
  console.log("Server is listening on port : " + PORT);
});
