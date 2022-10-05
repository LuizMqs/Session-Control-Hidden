const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json({ extended: true });
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
const { get } = require("http");
const { Pool } = require("pg"),
  pool = new Pool({
    host: "localhost",
    password: "luiz1235",
    port: 5432,
    database: "hidden_input",
    user: "postgres",
  });

const app = express();

app.use(jsonParser);
app.use(cors({ origin: "http://localhost:3000", credentials: "include" }));

app.post("/login", urlencodedParser, async (req, res) => {
  if (
    !req.body.token ||
    req.body.token != "token:gnda1sj412kgb532dw4jf4a2qk421513dp2nmb"
  ) {
    res.sendStatus(401);
  }

  const userLogin = await pool.query(
    "UPDATE users SET token = $1 WHERE username = $2 AND password = $3 RETURNING id",
    [req.body.token, req.body.name, req.body.password]
  );

  res.redirect("http://localhost:3000/home");
});

app.get("/home", urlencodedParser, async (req, res) => {
  const getLogin = await pool.query(
    `SELECT id FROM users WHERE token = 'token:gnda1sj412kgb532dw4jf4a2qk421513dp2nmb'`
  );

  if (getLogin.rows.length > 0) {
    res.redirect("http://localhost:3000/home/");
  } else {
    res.redirect("http://localhost:3000/login/");
  }
});

app.post("/logout", urlencodedParser, async (req, res) => {
  const userLogout = await pool.query(
    "UPDATE users SET token = '' WHERE token = 'token:gnda1sj412kgb532dw4jf4a2qk421513dp2nmb'"
  );

  res.redirect("http://localhost:3000/login/");
});

app.listen(8000, () => console.log("Backend is listening on port 8000!!"));
