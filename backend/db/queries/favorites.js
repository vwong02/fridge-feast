const { dbPool } = require("../connection")

const getFavorites = (user_id) => {
  const _qry = `SELECT DISTINCT recipe_id FROM favorites where user_id = ${ user_id }`
  console.log(_qry)
  return dbPool
    .query(_qry)
    .then((data) => {
      return data.rows // data.rows from recipes table with tags, tags will be used post-filtering based on user's checkbox
    })
    .catch((error) => {
      console.error("Error search favorite: ", error)
      throw error
    })
}

const addFavorites = (favorite) => {
  return dbPool
    .query(
      `INSERT INTO favorites (user_id, recipe_id) 
      VALUES ($1, $2)`,
      [ favorite.user_id, favorite.recipe_id ]
    )
    .then(() => {
      console.log("Favorite added successfully!")
      return { added_fav_qty: 1 }
    })
    .catch((error) => {
      console.error("Error adding favorite: ", error)
      throw error
    })
}

const removeFavorites = (favorite) => {
  const removeQry = `DELETE FROM favorites WHERE user_id =${ favorite.user_id } and recipe_id=${ favorite.recipe_id }`
  return dbPool
    .query(removeQry)
    .then(() => {
      console.log(
        `Favorite (user_id =${ favorite.user_id }, recipe_id=${ favorite.recipe_id }) removed successfully!`
      )
      return { "removed_fav_qty": 1 }
    })
    .catch((error) => {
      console.error("Error removing favorite: ", error)
      throw error
    })
}

const isFavorited = (favorite) => {
  return dbPool
  .query(`SELECT * FROM favorites WHERE user_id =${ favorite.user_id } AND recipe_id=${ favorite.recipe_id }`)
    .then((data) => {
      return data.rows[ 0 ]
    })
    .catch(error => {
      console.error('Error searching favorites: ', error)
      throw error
    })
}

module.exports = { getFavorites, addFavorites, removeFavorites, isFavorited }
