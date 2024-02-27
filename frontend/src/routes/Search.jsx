import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap"
import axios from "axios"
import RecipeCard from "../components/RecipeCard"
import "../styles/Search.css"

const loadMoreCount = 12

function chunkArray(array, chunkSize) {
  const chunks = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

function SearchResults({ sessionCookie }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [originalRecipes, setOriginalRecipes] = useState([]) // New state for original recipes
  const [recipes, setRecipes] = useState([])
  const [showIndex, setShowIndex] = useState(loadMoreCount)
  const [sortBy, setSortBy] = useState("likes") // Default sort by likes
  const [sortOrder, setSortOrder] = useState("desc") // Default sort order descending

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`http://localhost:3000/s/${searchTerm}`)
      setOriginalRecipes(response.data) // Set original recipes
      setRecipes(response.data)
    } catch (error) {
      console.error("Error fetching recipes with ingredient:", error)
    }
  }

  const handleSortByChange = (sortByOption) => {
    const [newSortBy, newSortOrder] = sortByOption.split("-")
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
  }

  useEffect(() => {
    // Sorting the original recipes array based on sortBy and sortOrder
    const sortedRecipes = [...originalRecipes].sort((a, b) => {
      if (sortBy === "likes") {
        return sortOrder === "asc" ? a.likes - b.likes : b.likes - a.likes
      } else if (sortBy === "unusedIngredientCount") {
        return sortOrder === "asc"
          ? a.usedIngredientCount - b.usedIngredientCount
          : b.usedIngredientCount - a.usedIngredientCount
      }
    })
    setRecipes(sortedRecipes)
  }, [sortBy, sortOrder, originalRecipes])

  const handleClickLoadMore = () => {
    const newIndexEnd = showIndex + loadMoreCount
    setShowIndex(newIndexEnd)
  }

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipeId(recipeId)
  }

  return (
    <div className="bg-light pt-5">
      <Container>
        <Row className="justify-content-center recipe-row">
          <Col>
            <Card className="search-card">
              <Card.Body>
                <h2 className="mb-4">Find Recipes</h2>
                <form onSubmit={handleSearchSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="Enter ingredients (separate by comma)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="primary" type="submit" className="mt-4">
                    Submit
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {recipes.length > 0 && (
        <Container>
          {/* Sortby Dropdown */}
          <Container>
            <div className="sort-by-btn mt-5">
              <label htmlFor="sortby">Sort By: </label>
              <select
                id="sortby"
                onChange={(e) => handleSortByChange(e.target.value)}
                value={`${sortBy}-${sortOrder}`}>
                <option value="likes-desc">Most Popular</option>
                <option value="unusedIngredientCount-desc">
                  Matching Ingredients (desc)
                </option>
                <option value="unusedIngredientCount-asc">
                  Matching Ingredients (asc)
                </option>
              </select>
            </div>
          </Container>
          <Row className="mt-3 justify-content-center">
            {recipes.slice(0, showIndex).map((recipe) => (
              <Col
                key={recipe.id}
                xs={6}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                className="mb-4">
                <RecipeCard
                  recipe={recipe}
                  onClick={handleRecipeClick}
                  sessionCookie={sessionCookie}
                />
              </Col>
            ))}
            {showIndex < 48 && (
              <div className="load-container">
                <Button
                  className="btn btn-primary mb-4"
                  onClick={() => handleClickLoadMore()}>
                  Load More
                </Button>
              </div>
            )}
          </Row>
        </Container>
      )}
    </div>
  )
}

export default SearchResults
