"use strict"

const express = require("express");
const app = express();
//const morgan = require("morgan");

//Routes
//User
const userRoutes = require("./server/routes/user.routes");
//User2
const user2Routes = require("./server/routes/user2.routes");
//Project
const projectRoutes = require("./server/routes/project.routes");

// Settings -> Configuración del servidor
const cors = require("cors");
const properties = require("./server/config/properties");

// Middlewares -> Funciones para tratar los datos
app.use(cors());
app.use(express.json());

//Arrancar mongo
const DB = require("./server/config/database");
DB();

const router = express.Router();
//const { mongoose } = require("./config/database");

app.set("port", properties.PORT);

app.use("/api/users", router);
userRoutes(router);

app.use("/api/users2", router);
user2Routes(router);

app.use("/api/projects", router);
projectRoutes(router);

app.use(router);

// Starting the server
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});