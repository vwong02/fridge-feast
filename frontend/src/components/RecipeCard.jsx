import React from "react"
import FavButton from "./FavButton"

const RecipeCard = ({ recipe, sessionCookie }) => {
  return (
    <div className="card search-recipe-card">
      <a href={`/recipes/${recipe.id}`}>
        <img
          src={recipe.image}
          className="card-img-top recipe-img"
          alt="Recipe"
        />
      </a>
      <div className="card-body">
        {sessionCookie == null ? (
          <></>
        ) : (
          <FavButton sessionCookie={sessionCookie} recipeid={recipe.id} />
        )}
        <h5 className="card-title smaller-title">{recipe.title}</h5>
      </div>
    </div>
  )
}

export default RecipeCard
