import React, { useState, useEffect } from "react"
import axios from "axios"
import { Card, Container } from "react-bootstrap"
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
        setSimilarRecipes(response.data)
      } catch (error) {
        console.error("Error fetching similar recipe:", error)
      }
    }

    getSimilarRecipes()
  }, [recipeId])

  return (
    <Container>
      <h3>Similar Recipes</h3>
      <div className="recipe-card-container">
        {similarRecipes.map((recipe) => (
          <a href={recipe.sourceUrl}>
            <Card>
              {recipe.title} | Ready in {recipe.readyInMinutes} minutes | Serves:{" "}
              {recipe.servings}
            </Card>
          </a>
        ))}
      </div>
    </Container>
  )
}

export default SimilarRecipes
