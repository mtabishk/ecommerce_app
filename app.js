const express = require("express");
const Sequelize = require("sequelize");

const app = express();
app.use(express.urlencoded({ extended: false }));

// setup a new database using database credentials set in .env
var sequelize = new Sequelize("database", "testdb", "test@123", {
  host: "0.0.0.0",
  dialect: "sqlite",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  storage: __dirname + "/db/database.sqlite",
});

// authenticate with the database
sequelize
  .authenticate()
  .then(function (err) {
    console.log("Connection established.");
    // define new table: 'users'
    User = sequelize.define("users", {
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
    });
    //User.sync({ alter: true });
  })
  .catch(function (err) {
    console.log("Unable to connect to database: ", err);
  });

function addUser(email, password) {
  return new Promise(function (resolve, reject) {
    User.create({
      email: email,
      password: password,
    })
      .then(function (user) {
        resolve(user);
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

function checkUserCredentials(email, password) {
  return new Promise(function (resolve, reject) {
    User.findOne({
      where: {
        email: email,
        password: password,
      },
    })
      .then(function (user) {
        resolve(user);
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

app.use("/", express.static(__dirname));

app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  // check if user exists in database
  checkUserCredentials(email, password)
    .then(function (user) {
      if (user) {
        res.redirect("/contactus.html");
      } else {
        res.send("Login failed");
      }
    })
    .catch(function (err) {
      res.send("Login failed: " + err);
    });
});

app.post("/signup", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let confPassword = req.body.confPassword;
  if (password === confPassword) {
    addUser(email, password);
    res.redirect("/");
  } else {
    res.send("Signup failed");
  }
});

// Establishing the port
const PORT = process.env.PORT || 5000;

// Executing the server on given port number
app.listen(PORT, console.log(`Server started on port ${PORT}`));
