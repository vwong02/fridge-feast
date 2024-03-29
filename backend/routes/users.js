/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getUsers, addUser, loginUser } = require('../db/queries/user');
const { spoonacularApiKey } = require("../db/connection");

router.get('/', (req, res) => {
  const results = [];

  getUsers()
    .then((users) => {
      users.forEach(user => {
        results.push(user);
      });
      res.send(results);
    })
    .catch((err) => {
      console.log("Error fetching users.", err);
      throw err;
    });
});

router.post('/auth', (req, res) => {
  const { email, password } = req.body;

  loginUser(email, password)
    .then((result) => {
      if (result) {
        const randomTokenLength = 5;
        const randomToken = (Math.random() + 1).toString(36).substring(2, 2 + randomTokenLength);
        res.send({ authToken: randomToken, userid: result.id });
      } else {
        res.status(401).send({ error: "Invalid email or password. Please try again" });
      }
    })
    .catch((err) => {
      console.error("An unexpected error occurred", err);
      res.status(500).send({ error: "An unexpected error occurred" });
    });
});

router.post('/save', (req, res) => {
  const user = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  // Check if the email already exists
  getUsers()
    .then(users => {
      const existingUser = users.find(existingUser => existingUser.email === user.email);
      if (existingUser) {
        throw new Error("Email is already in use");
      }
      // Email is not in use, proceed with adding the user
      return addUser(user);
    })
    .then(result => {
      console.log("User signup successful!");
      res.send(result);
    })
    .catch(err => {
      if (err.message === "Email is already in use") {
        console.log(err.message);
        res.status(409).send({ error: err.message });
      } else {
        console.error("Error creating the user. ", err);
        res.status(500).send({ error: "An unexpected error occurred" });
      }
    });

});


module.exports = router;