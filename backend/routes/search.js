/*
 * All routes for searching are defined here
 * Since this file is loaded in server.js into /s,
 *   these routes are mounted onto /s
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express')
const router = express.Router()
const axios = require('axios')
const { spoonacularApiKey } = require("../db/connection")

// Route for searching recipes by ingredients
router.get('/:i', (req, res) => {

  const apiEndpoint = 'https://api.spoonacular.com/recipes/findByIngredients'

  const options = {
    params: {
      ingredients: req.params.i,
      number: 48
    },
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': spoonacularApiKey
    }
  }

  axios
    .get(apiEndpoint, options)
    .then((response) => {
      console.log(response.data)
      res.send(response.data)
    })
    .catch((err) => {
      console.error("====", err)
    })
    .finally(() => {
      console.log("--End--")
    })
})

module.exports = router
