/*
 * All routes for searching are defined here
 * Since this file is loaded in homepage.js into /home,
 *   these routes are mounted onto /home
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express')
const router = express.Router()
const axios = require('axios')
const { spoonacularApiKey } = require("../db/connection")

router.get('/random', (req, res) => {
  const apiEndpoint = `https://api.spoonacular.com/recipes/random`

  const options = {
    params: {
      // 'include-tags': 'meal, cuisine, vegetarian, dessert',
      number: 4
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