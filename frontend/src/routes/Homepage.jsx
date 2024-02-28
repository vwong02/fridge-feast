import { useState, useEffect } from "react"
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
        <div className="container">
          <h1 className="display-5 fw-bold header-title mb-4 p-1">
            The Ultimate Cooking Companion
          </h1>
          <p className="col-md-8 fs-4 header-text mb-4 p-1">
            Fridge Feast allows you to effortlessly create delicious meals from
            what you already have in your fridge. Simply input your ingredients,
            and let the app generate a variety of mouthwatering recipes tailored
            to your specific ingredients.
          </p>
          <a
            href="/search"
            className="btn btn-primary btn-lg"
            role="button"
            aria-pressed="true"
          >
            Explore Recipes
          </a>
        </div>
      </div>

      {/* Featured Recipes Card Section */}
      <div className="p-5 bg-light">
        <div className="container">
          <h2 className="mb-4">Featured Recipes</h2>
          <div className="row">
            {randomRecipes.map((randomRecipe) => (
              <div
                className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 pb-5"
                key={randomRecipe.id}
              >
                <div className="card home-recipe-card">
                  <a href={`/recipes/${randomRecipe.id}`}>
                    <img
                      className="card-img-top recipe-card-img"
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
                  <div className="card-body">
                    <h5 className="card-title smaller-title">
                      {randomRecipe.title}
                    </h5>
                    <p className="card-text smaller-text">
                      {randomRecipe.readyInMinutes} minutes | Serving Size:{" "}
                      {randomRecipe.servings}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
