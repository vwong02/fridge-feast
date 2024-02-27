import React from "react"
import RecipeItem from "../components/RecipeItem"
import SimilarRecipes from "../components/SimilarRecipes"

const RecipePage = ({sessionCookie}) => {
  return (
    <>
      <RecipeItem sessionCookie={sessionCookie} />
      {/* <SimilarRecipes /> */}
    </>
  )
}

export default RecipePage
