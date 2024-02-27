const { dbPool } = require('../connection');

const getIngredients = () => {
  return dbPool.query('SELECT * FROM ingredients;')
    .then(data => {
      return data.rows
    });
};

const addIngredient = (ingredient) => {
  return dbPool.query(`INSERT INTO ingredients (name, description, quantity, image, expiry_date)
      VALUES ($1, $2, $3, $4, $5)`,
  [ingredient.name, ingredient.description, ingredient.quantity, ingredient.image, ingredient.expiry_date])
    .then(() => {
      console.log('Ingredient added successfully!')
    })
    .catch(error => {
      console.error('Error adding ingredient: ', error)
      throw error
    })
}

module.exports = { getIngredients, addIngredient }