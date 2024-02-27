const { dbPool } = require('../connection')

const getRecipes = () => {
  return dbPool.query('SELECT * FROM recipes;')
    .then(data => {
      return data.rows
    })
}

const addRecipes = (recipe) => {
  return dbPool.query(`INSERT INTO recipes (name, description, image, serving_size, directions) 
      VALUES ($1, $2, $3, $4, $5)`,
  [recipe.name, recipe.description, recipe.image, recipe.serving_size, recipe.directions])
    .then(() => {
      console.log('Recipe added successfully!')
    })
    .catch(error => {
      console.error('Error adding recipe: ', error)
      throw error
    })
}

const getRecipeById = (recipe_id) => {
  return dbPool.query(`SELECT * FROM recipes WHERE ID = $1`,
  [recipe_id])
    .then((result) => {
      console.log('Recipe got successfully!')
      return result.rows[0]
    })
    .catch(error => {
      console.error('Error getting recipe: ', error)
      throw error
    })
}

module.exports = { getRecipes, addRecipes, getRecipeById }