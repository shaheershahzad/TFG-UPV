"use strict"

const express = require("express");
const app = express();
const path = require("path");
//const morgan = require("morgan");

//Routes

//User
const userRoutes = require("./server/routes/user.routes");
//User2
const user2Routes = require("./server/routes/user2.routes");
//Project
const projectRoutes = require("./server/routes/project.routes");
//Newsletter
const newsletterRoutes = require("./server/routes/newsletter.routes");
//File
const fileRoutes = require("./server/routes/file.routes");

// Settings -> Configuración del servidor
const cors = require("cors");
const properties = require("./server/config/properties");
app.set("port", properties.PORT);

// Middlewares -> Funciones para tratar los datos
app.use(cors());
app.use(express.json());

//For deployment
app.use(express.static(path.join(__dirname, "./frontend/dist/frontend")));

//Arrancar mongo
const DB = require("./server/config/database");
DB();

const router = express.Router();
//const { mongoose } = require("./config/database");

app.use("/api/users", router);
userRoutes(router);

/*app.use("/api/users2", router);
user2Routes(router);*/

/*app.use("/api/projects", router);
projectRoutes(router);*/

app.get('/', (req, res) => {
    res.send('MAIN SERVER!')
});

app.use(router);
//app.use('/api/users', userRoutes);
app.use('/api/users2', user2Routes);
app.use('/api/projects', projectRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/files', fileRoutes);

app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "./frontend/dist/frontend/index.html"));
});

// Starting the server
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});