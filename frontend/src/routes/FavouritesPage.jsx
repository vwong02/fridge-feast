import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import axios from "axios"
import FiltersMenu from "../components/FiltersMenu"
import FavButton from "../components/FavButton"
import "../styles/Favourites.css"

const FavouritesPage = ({ sessionCookie }) => {
  const [loading, setLoading] = useState(true)
  const [allFavRecipes, setAllFavRecipes] = useState([])
  const [filteredFavRecipes, setFilteredFavRecipes] = useState([])
  const [sortedFavRecipes, setSortedFavRecipes] = useState([])

  // Sory by most popular recipes by default
  const [sortBy, setSortBy] = useState("spoonacularScore")
  const [sortOrder, setSortOrder] = useState("desc")
  const userid = sessionCookie.userid

  // GET USERS FAV RECIPES
  useEffect(() => {
    const getFavUserRecipes = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/fav/list`, {
          userid: userid,
        })
        const favUserRecipes = response.data.favs
        if (!Array.isArray(favUserRecipes) || favUserRecipes.length === 0) {
          setLoading(false)
          return
        }
        const recipeIds = favUserRecipes.map((fav) => fav.recipe_id).join(",")
        const responseAll = await axios.get(
          `http://localhost:3000/fav/bulkrecipes/${recipeIds}`
        )
        if (!Array.isArray(responseAll.data) || responseAll.data.length === 0) {
          setLoading(false)
          return
        }
        setAllFavRecipes(responseAll.data)
        setFilteredFavRecipes(responseAll.data) // Set filteredFavRecipes to allFavRecipes
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user fave recipes:", error)
        setLoading(false) // Add this line
      }
    }
    getFavUserRecipes()
  }, [userid])

  // FILTER BY FUNCTIONS
  const handleFilterChange = (conditions, times) => {
    // Check if any filters are checked
    const noConditionsChecked = Object.keys(conditions).length === 0
    const noTimesChecked = Object.keys(times).length === 0

    let tempFilteredRecipes = [...allFavRecipes] // Create a temporary variable to hold the filtered recipes

    // Filtering logic based on selected conditions and times
    tempFilteredRecipes = allFavRecipes.filter((recipe) => {
      let conditionsMatch = true
      let timeMatch = true

      if (!noConditionsChecked) {
        conditionsMatch = Object.keys(conditions).every((condition) => {
          const lowerCaseCondition = condition.toLowerCase()
          return recipe.diets.some((diet) =>
            diet.toLowerCase().includes(lowerCaseCondition)
          )
        })
      }

      if (!noTimesChecked) {
        timeMatch = Object.keys(times).some((time) => {
          if (time === "<15") {
            const readyInMinutes = parseInt(recipe.readyInMinutes)
            return readyInMinutes < 15
          } else if (time === ">90") {
            const readyInMinutes = parseInt(recipe.readyInMinutes)
            return readyInMinutes > 90
          } else {
            const [min, max] = time.split("-").map(Number)
            const readyInMinutes = parseInt(recipe.readyInMinutes)
            return min <= readyInMinutes && readyInMinutes <= max
          }
        })
      }
      return conditionsMatch && timeMatch
    })
    // Update filtered recipes state
    setFilteredFavRecipes(tempFilteredRecipes)
  }

  // SORT BY FUNCTIONS
  const handleSortByChange = (sortByOption) => {
    const [newSortBy, newSortOrder] = sortByOption.split("-")
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
  }

  useEffect(() => {
    if (filteredFavRecipes.length > 0) {
      // Sorting the recipes array based on sortBy and sortOrder
      const sortedRecipes = [...filteredFavRecipes].sort((a, b) => {
        if (sortBy === "spoonacularScore") {
          return sortOrder === "asc"
            ? a.spoonacularScore - b.spoonacularScore
            : b.spoonacularScore - a.spoonacularScore
        } else if (sortBy === "readyInMinutes") {
          return sortOrder === "asc"
            ? a.readyInMinutes - b.readyInMinutes
            : b.readyInMinutes - a.readyInMinutes
        } else if (sortBy === "pricePerServing") {
          return sortOrder === "asc"
            ? a.pricePerServing - b.pricePerServing
            : b.pricePerServing - a.pricePerServing
        }
      })
      setSortedFavRecipes(sortedRecipes)
    }
  }, [sortBy, sortOrder, filteredFavRecipes])

  return (
    <Container className="my-4">
      <Row>
        <Col md={3}>
          <FiltersMenu onFilterChange={handleFilterChange} />
        </Col>
        <Col md={9}>
          <h1 className="mt-4">Favourites</h1>
          {(allFavRecipes.length > 0 && filteredFavRecipes.length > 0) && (
            <div className="mb-4 sort-container">
              <Form.Group controlId="sortby" className="sort-group">
                <Form.Label>Sort By: </Form.Label>
                <Form.Select
                  size="sm"
                  as="select"
                  onChange={(e) => handleSortByChange(e.target.value)}
                  value={`${sortBy}-${sortOrder}`}
                >
                  <option value="spoonacularScore-desc">Most Popular</option>
                  <option value="readyInMinutes-desc">Time (desc)</option>
                  <option value="readyInMinutes-asc">Time (asc)</option>
                  <option value="pricePerServing-desc">
                    Price Per Serving (desc)
                  </option>
                  <option value="pricePerServing-asc">
                    Price Per Serving (asc)
                  </option>
                </Form.Select>
              </Form.Group>
            </div>
          )}

          {loading ? (
            <div>Loading...</div>
          ) : allFavRecipes.length === 0 ? (
            <p>
              You don't have any favourited recipes. Explore recipes{" "}
              <a href="/search">here</a>.
            </p>
          ) : filteredFavRecipes.length === 0 ? (
            <p className="mt-4">Sorry, no favourite recipes match your filter criteria.</p>
          ) : (
            <Row>
              {sortedFavRecipes.map((favRecipe) => (
                <Col
                  key={favRecipe.id}
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={3}
                  className="mb-4"
                >
                  <Card>
                    <Card.Link href={`/recipes/${favRecipe.id}`}>
                      <Card.Img
                        variant="top"
                        src={favRecipe.image}
                        alt={favRecipe.title}
                      />
                    </Card.Link>
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    >
                      <FavButton
                        sessionCookie={sessionCookie}
                        recipeid={favRecipe.id}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="smaller-text">
                        {favRecipe.title}
                      </Card.Title>
                      <Card.Text className="small">
                        {favRecipe.readyInMinutes} minutes | Serving Size:{" "}
                        {favRecipe.servings}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default FavouritesPage
