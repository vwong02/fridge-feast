import React, { useContext } from "react"
import Card from "react-bootstrap/Card"
import FavButton from "./FavButton"

const SearchResultsCard = ({ recipe, sessionCookie }) => {
  return (
    <Card className="search-recipe-card">
      <Card.Link href={`/recipes/${recipe.id}`}>
        <Card.Img variant="top" className="recipe-img" src={recipe.image} />
      </Card.Link>

      {sessionCookie &&
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <FavButton sessionCookie={sessionCookie} recipeid={recipe.id} />
        </div>
      }
      <Card.Body>
        <Card.Title className="smaller-title">{recipe.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default SearchResultsCard
