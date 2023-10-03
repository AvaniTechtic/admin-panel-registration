// routes/users.js
const express = require("express");
const router = express.Router();
const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/adminRegister", async (req, res) => {
  try {
    let { body } = req;
    // Json creation for storing it in database
    let payload = {
      Username: body.Username,
      email: body.email,
      password: bcrypt.hashSync(body.password, 16),
      userType: "Admin"
    };
    await UserModel.create(payload)
      .then((savedUser) => {
        // Handle successful save
        res.json({
          status: 200,
          data: savedUser,
        });
      })
      .catch((error) => {
        // Handle error
        console.log("error", error);
      });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
