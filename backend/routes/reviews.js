/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getReviews, addReview } = require('../db/queries/review');
const { spoonacularApiKey } = require("../db/connection")

router.get('/', (req, res) => {
  const toUserId = req.session.userId ? req.session.userId : 1;
  const toUserName = req.session.username ? req.session.username : '';
  const results = []
  getReviews()
    .then((reviews) => {
      reviews.forEach(review => {
        results.push(review)
      })

      res.json(results)
    })
});

router.get('/new', (req, res) => {
  res.render('review')
})

router.post('/save', (req, res) => {
  const rating = req.body.rating
  const userId = req.body.userId
  const userEmail = req.body.userEmail
  const comment = req.body.comment
  const recipeId = req.body.recipeId

  const review = {
    user_id:  userId,
    recipe_id:  recipeId,
    rating: rating,
    comment:  comment
  }

  addReview(review)
    .then(() => {
      res.send({ message: 1 })
    })
    .catch((error) => {
      console.error("Error marking the review. ", error)
    })
})

module.exports = router
