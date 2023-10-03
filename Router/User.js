// routes/users.js
const express = require("express");
const router = express.Router();
const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/adminLogin", async (req, res) => {
  try {
    let { body } = req;
    // Json creation for storing it in database
    let whereQuery = {
      email: body.email,
      userType: "Admin"
    };
    UserModel.findOne(whereQuery)
      .then((response) => {
        if (response) {
          if (bcrypt.compareSync(body.password, response.password)) {
            // generate jwt token
            let token = jwt.sign(
              {
                Username: response.Username,
                userType: response.userType,
                email: response.email,
                id: response._id,
                userType: "Admin"
              },
              `key23KFUWqdi789`
            );

            res.status(200).json({
              message: "Successfully logged in",
              data: {
                Username: response.Username,
                userType: response.userType,
                email: response.email,
                id: response._id,
                Token: token,
              },
            });
          } else {
            res.status(403).json({
              message: "Inserted Password is incorrect",
            });
          }
        } else {
          res.status(404).json({
            message: "Admin Not Found with the given Email Id",
          });
        }
      })
      .catch((error) => {
        printConsole(error);
      });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
