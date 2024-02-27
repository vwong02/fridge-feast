/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express')
const router = express.Router()
const { getIngredients, addIngredient } = require('../db/queries/ingredient')
const { spoonacularApiKey } = require("../db/connection")

router.get('/', (req, res) => {
  const results = []
  getIngredients()
    .then(ingredients => {
      ingredients.forEach(ingredient => {
        results.push(ingredient)
      })
      res.send(results)
    })
})

router.post('/save', (req, res) => {
  const ingredient = {
    name: req.body.name,
    description:  req.body.description,
    quantity: req.body.quantity,
    image:  req.body.image,
    expiry_date:  req.body.expiryDate
  }

  addIngredient(ingredient)
    .then(() => {
      console.log("Ingredient added successfully!")
      res.send({ msg: 1 })
    })
    .catch((err) => {
      console.error("Error adding new ingredient.", err)
      throw err
    })
})

router.get('/new', (req, res) => {
  res.render('newIngredient')
})

module.exports = router
