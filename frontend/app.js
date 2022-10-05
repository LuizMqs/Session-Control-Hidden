const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use("/login", express.static("src/pages/login"));
app.use("/home", express.static("src/pages/home"));

app.listen(port, () => console.log("Frontend is listening on port 3000!!"));
