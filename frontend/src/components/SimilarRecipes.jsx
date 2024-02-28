import React, { useState, useEffect } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"

const SimilarRecipes = () => {
  const [similarRecipes, setSimilarRecipes] = useState([])
  const location = useLocation().pathname
  const recipeId = location.replace("/recipes/", "")

  useEffect(() => {
    const getSimilarRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/${recipeId}/similar`
        )
        console.log("getSimilarRecipes response.data: ", response.data)
        setSimilarRecipes(response.data)
      } catch (error) {
        console.error("Error fetching similar recipe:", error)
      }
    }

    getSimilarRecipes()
  }, [recipeId])

  return (
    <div className="container">
      <h3>Similar Recipes</h3>
      <div className="recipe-card-container">
        {similarRecipes.map((recipe) => (
          <a href={recipe.sourceUrl}>
            <div className="card">
              {recipe.title} | Ready in {recipe.readyInMinutes} minutes |
              Serves: {recipe.servings}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default SimilarRecipes
