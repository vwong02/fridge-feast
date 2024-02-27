/**
 * Defines Express routes for managing user favorites.
 * Includes routes for getting favorites, adding/removing favorites,
 * and checking if recipe is favorited.
 * Makes API requests to Spoonacular for recipe info.
 */
/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express")
const router = express.Router()
const axios = require("axios")
const favQry = require("../db/queries/favorites")
const { spoonacularApiKey } = require("../db/connection")

router.post("/list", (req, res) => {
  console.log(req.body)
  favQry
    .getFavorites(req.body.userid)
    .then((favs) => {
      res.send({ favs: favs }) // favs = Array[Object,..]
    })
    .catch((error) => {
      console.error("user's fav query has error: ", error)
    })
})

router.get("/list/:userid", (req, res) => {
  const { userid } = req.params
  favQry
    .getFavorites(userid)
    .then((favs) => {
      res.send({ favs: favs }) // favs = Array[Object,..]
    })
    .catch((error) => {
      console.error("user's fav query has error: ", error)
    })
})

router.post("/delete", (req, res) => {
  favQry
    .removeFavorites({ user_id: req.body.userid, recipe_id: req.body.recipeid })
    .then((result) => {
      res.send({ qty: result.removed_fav_qty })
    })
    .catch((error) => {
      console.error("user's remove fav query has error: ", error)
    })
})

router.post("/add", (req, res) => {
  favQry
    .addFavorites({ user_id: req.body.userid, recipe_id: req.body.recipeid })
    .then((result) => {
      res.send({ qty: result.added_fav_qty })
    })
    .catch((error) => {
      console.error("user's added fav query has error: ", error)
    })
})

router.get("/bulkrecipes/:id", (req, res) => {
  const recipeId = req.params.id

  const apiEndpoint = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeId}`

  const options = {
    // params: {
    //   ids: recipeId
    // },
    headers: {
      "Content-Type": "application/json",
      "x-api-key": spoonacularApiKey,
    },
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
