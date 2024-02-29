import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Container } from "react-bootstrap"
import axios from "axios"
import FavButton from "../components/FavButton"
import "../styles/Homepage.css"

const Homepage = ({ sessionCookie }) => {
  const [randomRecipes, setRandomRecipes] = useState([])

  const getRandomRecipes = async () => {
    try {
      // Make a GET request to your backend route to fetch random recipes
      const response = await axios.get("http://localhost:3000/home/random")

      // Extract recipe data from the response
      const randomRecipeData = response.data.recipes

      // Update state with the fetched recipes
      setRandomRecipes(randomRecipeData)
    } catch (error) {
      console.error("Error fetching recipes:", error)
    }
  }

  // Call the fetchRecipes function when the component mounts
  useEffect(() => {
    getRandomRecipes()
  }, [])

  return (
    <div>
      {/* Header Section */}
      <div className="p-5 bg-secondary header-image">
        <Container>
          <h1 className="display-5 fw-bold header-title mb-4 p-1">
            The Ultimate Cooking Companion
          </h1>
          <p className="col-md-8 fs-4 header-text mb-4 p-1">
            Fridge Feast allows you to effortlessly create delicious meals from
            what you already have in your fridge. Simply input your ingredients,
            and let the app generate a variety of mouthwatering recipes tailored
            to your specific ingredients.
          </p>
          <a href="/search">
            <Button
              className="btn btn-primary btn-lg"
              type="button"
              alt="explore-recipes-btn"
            >
              Explore Recipes
            </Button>
          </a>
        </Container>
      </div>

      {/* Featured Recipes Card Section */}
      <div className="p-5 bg-light">
        <Container>
          <h2 className="mb-4">Featured Recipes</h2>
          <Row>
            {randomRecipes.map((randomRecipe) => (
              <Col
                xs={6}
                sm={6}
                md={6}
                lg={3}
                xl={3}
                key={randomRecipe.id}
                className="pb-5"
              >
                <Card className="home-recipe-card">
                  <a href={`/recipes/${randomRecipe.id}`}>
                    <Card.Img
                      variant="top"
                      className="recipe-card-img"
                      src={randomRecipe.image}
                      alt={randomRecipe.title}
                    />
                  </a>
                  {sessionCookie == null ? (
                    <></>
                  ) : (
                    <div className="fav-button-container">
                      <FavButton
                        sessionCookie={sessionCookie}
                        userid={sessionCookie.userid}
                        recipeid={randomRecipe.id}
                      />
                    </div>
                  )}
                  <Card.Body>
                    <Card.Title className="smaller-title">
                      {randomRecipe.title}
                    </Card.Title>
                    <Card.Text className="smaller-text">
                      {randomRecipe.readyInMinutes} minutes | Serving Size:{" "}
                      {randomRecipe.servings}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Homepage
