const express = require('express');
const router = express.Router();
const { getUsers, addUser, loginUser } = require('../db/queries/user')

router.get('/', (req, res) => {
  getUsers()
    .then(data => {
      const templateVars = { username: req.session.username, userId: req.session.userId, data }

      if(req.session.userId) {
        return res.redirect("/f/feeds")
      }

      res.render('register', templateVars)
    })
})

router.post('/', (req, res) => {
  console.log(req.body)
  const { username, phone_number, email, password } = req.body
  const newUser = {
    username,
    phone_number,
    email,
    password
  }

  if (!username || !email || !password) {
    return res.status(400).send("Error: username, email, and password is required to register")
  }

  getUsers()
    .then((data) => {
      const userWithEmail = data.find((user) => user.email === email)

      if (userWithEmail) {
        return res.status(404).send("User already exists")
      }

      addUser(newUser)

      console.log(newUser)

      res.redirect("/f/feeds")

    })
    .catch(error => {
      console.error('Error searching user: ', error)
    })

})


module.exports = router

