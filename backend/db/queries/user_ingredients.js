const { dbPool } = require('../connection')

const getUserIngredients = () => {
  return dbPool.query('SELECT * FROM user_ingredients;')
    .then(data => {
      return data.rows;
    })
}

const addUserIngredient = (userIngredient) => {
  return dbPool.query(`INSERT INTO user_ingredients (user_id, ingredient_id)
      VALUES ($1, $2)`,
  [userIngredient.user_id, userIngredient.ingredient_id])
    .then(() => {
      console.log('User-Ingredient added successfully!')
    })
    .catch(error => {
      console.error('Error adding User-Ingredient: ', error)
      throw error
    })
}

module.exports = { getUserIngredients, addIngraddUserIngredientedient }