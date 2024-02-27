import React, { useContext } from "react"
import Card from "react-bootstrap/Card"
// import FavouriteButton from "../components/FavouriteButton"
import FavButton from "./FavButton"

const RecipeCard = ({ recipe, sessionCookie }) => {
  return (
    <Card className="search-recipe-card">
      <a href={`/recipes/${recipe.id}`}>
        <Card.Img variant="top" className="recipe-img" src={recipe.image} />
      </a>
      <Card.Body>
        {sessionCookie == null ? (
          <></>
        ) : (
            <FavButton
              sessionCookie={sessionCookie}
              recipeid={recipe.id}
            />
        )}
        <Card.Title className="smaller-title">{recipe.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default RecipeCard
