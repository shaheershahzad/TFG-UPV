"use strict"
const cors = require("cors");
//Auth
const authRoutes = require("./server/routes/auth.routes");
const express = require("express");
const app = express();
//const morgan = require("morgan");

// Settings -> Configuración del servidor
const properties = require("./server/config/properties");

//Arrancar mongo
const DB = require("./server/config/database");
DB();

const router = express.Router();
//const { mongoose } = require("./config/database");

app.use(cors());

app.set("port", properties.PORT);

app.use("/api", router);
authRoutes(router);
router.get("/", (req, res) => {
    res.send("Hello from home");
});

const bodyParser = require("body-parser");
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded( {extended: true} )

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(router);

// Middlewares -> Funciones para tratar los datos
/*app.use(morgan("dev"));
app.use(express.json());*/
//app.use(cors({origin: "http://localhost:4200"}));

// Routes -> Rutas de nuestro servidor
//app.use("/api/employees", require("./routes/employee.routes"));

// Starting the server
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});