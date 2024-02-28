import { useState, useEffect } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import "../styles/RecipePage.css"
import FavButton from "./FavButton"

const RecipeItem = ({ sessionCookie }) => {
  const [recipeById, setRecipeById] = useState(null)
  const location = useLocation().pathname
  const recipeId = location.replace("/recipes/", "")

  useEffect(() => {
    const getRecipeById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/${recipeId}/information`
        )
        setRecipeById(response.data)
      } catch (error) {
        console.error("Error fetching recipe:", error)
      }
    }

    getRecipeById()
  }, [])

  if (!recipeById) {
    return <div>Loading...</div>
  }

  return (
    <div className="container my-5">
      <div className="card p-5">
        <div className="row">
          <div className="col">
            <div className="recipe-title-container">
              <h2>{recipeById.title}</h2>
              {sessionCookie == null ? (
                <></>
              ) : (
                <div className="fav-button-container">
                  <FavButton
                    addNew={true}
                    userid={sessionCookie.userid}
                    recipeid={recipeById.id}
                  />
                </div>
              )}
            </div>
            <p>
              <strong>Time:</strong> {recipeById.readyInMinutes} minutes |{" "}
              <strong>Serving Size:</strong> {recipeById.servings}
            </p>
            <img
              src={recipeById.image}
              alt={recipeById.title}
              className="img-fluid recipe-page-img"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-12 col-lg-6">
            <h3>Ingredients</h3>
            <ul className="mb-5">
              {recipeById.extendedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-12 col-lg-6">
            {recipeById.analyzedInstructions &&
              recipeById.analyzedInstructions.length > 0 && (
                <>
                  <h3>Directions</h3>
                  <ol>
                    {recipeById.analyzedInstructions[0].steps.map(
                      (step, index) => (
                        <li key={index}>{step.step}</li>
                      )
                    )}
                  </ol>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeItem
