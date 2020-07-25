"use strict"

//Para leer las variables del fichero .env si estamos en desarrollo
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const multipart = require("connect-multiparty");
const path = require("path");
const morgan = require("morgan");

//Routes

//User
const userRoutes = require("./routes/user.routes");
//User2
const user2Routes = require("./routes/user2.routes");
//Project
const projectRoutes = require("./routes/project.routes");
//Newsletter
const newsletterRoutes = require("./routes/newsletter.routes");
//File
const fileRoutes = require("./routes/file.routes");

// Settings -> Configuración del servidor
const cors = require("cors");
const properties = require("./config/properties");
app.set("port", properties.PORT);

// Middlewares -> Funciones para tratar los datos
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
const multipartMiddleware = multipart({
    uploadDir: path.join(__dirname, "./public/uploads")
});

//For deployment
//app.use(express.static(path.join(__dirname, "../frontend/dist/frontend")));
app.use(express.static(path.join(__dirname, "public")));

//Arrancar mongo
const DB = require("./config/database");
DB();

const router = express.Router();
//const { mongoose } = require("./config/database");

//File uploader
app.post("/api/files/upload", multipartMiddleware, (req, res) => {
    res.json(req.files.uploads);
})

app.use("/api/users", router);
userRoutes(router);

/*app.use("/api/users2", router);
user2Routes(router);*/

/*app.use("/api/projects", router);
projectRoutes(router);*/

app.get('/', (req, res) => {
    res.send('MAIN SERVER!')
});

app.get('/info', (req, res) => {
    res.send('INFORMATION PAGE!')
});

app.use(router);
//app.use('/api/users', userRoutes);
app.use('/api/users2', user2Routes);
app.use('/api/projects', projectRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/files', fileRoutes);

app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "public/index.html"));
});

// Starting the server
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});