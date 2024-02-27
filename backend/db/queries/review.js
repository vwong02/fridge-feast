const { dbPool } = require('../connection')

const getReviews = () => {
  return dbPool.query('SELECT * FROM reviews')
    .then(data => {
      return data.rows;
    })
}

const addReview = (review) => {
  return dbPool.query(`INSERT INTO reviews (user_id, recipe_id, rating, comment)
      VALUES ($1, $2, $3, $4)`,
  [review.user_id, review.recipe_id, review.rating, review.comment])
    .then(() => {
      console.log('Review added successfully!')
    })
    .catch(error => {
      console.error('Error adding review: ', error)
      throw error
    })
}

module.exports = { getReviews, addReview }