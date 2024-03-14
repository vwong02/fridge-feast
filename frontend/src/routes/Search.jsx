import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap"
import axios from "axios"
import SearchResultsCard from "../components/SearchResultsCard"
import "../styles/Search.css"

// const loadMoreCount = 12

// function chunkArray(array, chunkSize) {
//   const chunks = []
//   for (let i = 0; i < array.length; i += chunkSize) {
//     chunks.push(array.slice(i, i + chunkSize))
//   }
//   return chunks
// }

function SearchResults({ sessionCookie }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [originalRecipes, setOriginalRecipes] = useState([]) // New state for original recipes
  const [recipes, setRecipes] = useState([])
  const [sortBy, setSortBy] = useState("likes") // Default sort by likes
  const [sortOrder, setSortOrder] = useState("desc") // Default sort order descending

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`http://localhost:3000/s/${searchTerm}`)
      setOriginalRecipes(response.data) 
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

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipeId(recipeId)
  }

  return (
    <div>
      <Container className="pt-5">
        <Row className="justify-content-center recipe-row">
          <Col>
            <Card className="search-card p-4">
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
          <div className="mt-5 mb-4 sort-container">
            <Form.Group controlId="sortby" className="sort-group">
              <Form.Label>Sort By: </Form.Label>
              <Form.Select
                size="sm"
                as="select"
                onChange={(e) => handleSortByChange(e.target.value)}
                value={`${sortBy}-${sortOrder}`}
              >
                <option value="likes-desc">Most Popular</option>
                <option value="unusedIngredientCount-desc">
                  Matching Ingredients (desc)
                </option>
                <option value="unusedIngredientCount-asc">
                  Matching Ingredients (asc)
                </option>
              </Form.Select>
            </Form.Group>
          </div>
          <Row className="mt-3 justify-content-center">
            {recipes.map((recipe) => (
              <Col
                key={recipe.id}
                xs={6}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                className="mb-4"
              >
                <SearchResultsCard
                  recipe={recipe}
                  onClick={handleRecipeClick}
                  sessionCookie={sessionCookie}
                />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  )
}

export default SearchResults
