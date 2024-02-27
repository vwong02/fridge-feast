import React, { useState } from "react"
import { Form, Container, Button } from "react-bootstrap"
import "../styles/Favourites.css"

const FiltersMenu = ({ onFilterChange }) => {
  const [selectedConditions, setSelectedConditions] = useState({})
  const [selectedTimes, setSelectedTimes] = useState({})

  const handleCheckboxChangeCondition = (event) => {
    const { value, checked } = event.target
    setSelectedConditions((prev) => {
      if (checked) {
        return { ...prev, [value]: value }
      } else {
        const { [value]: _, ...rest } = prev
        return rest
      }
    })
  }

  const handleCheckboxChangeTime = (event) => {
    const { value, checked } = event.target
    setSelectedTimes((prev) => {
      if (checked) {
        return { ...prev, [value]: value }
      } else {
        const { [value]: _, ...rest } = prev
        return rest
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onFilterChange(selectedConditions, selectedTimes)
  }

  return (
    <Container className="my-4">
      <Form className="filter-menu" onSubmit={handleSubmit}>
        <Container>
          <p>Filter By:</p>
          <div className="filter-group">
            <h5>Dietary Concern</h5>
            <Form.Check
              type="checkbox"
              id="vegan"
              label="Vegan"
              value="vegan"
              checked={"vegan" in selectedConditions}
              onChange={handleCheckboxChangeCondition}
            />
            <Form.Check
              type="checkbox"
              id="vegetarian"
              label="Vegetarian"
              value="vegetarian"
              checked={"vegetarian" in selectedConditions}
              onChange={handleCheckboxChangeCondition}
            />
            <Form.Check
              type="checkbox"
              id="dairyFree"
              label="Dairy Free"
              value="dairy free"
              checked={"dairy free" in selectedConditions}
              onChange={handleCheckboxChangeCondition}
            />
            <Form.Check
              type="checkbox"
              id="glutenFree"
              label="Gluten Free"
              value="gluten free"
              checked={"gluten free" in selectedConditions}
              onChange={handleCheckboxChangeCondition}
            />
          </div>
          <div className="filter-group mt-4">
            <h5>Time</h5>
            <Form.Check
              type="checkbox"
              id="<15"
              label="< 15 minutes"
              value="<15"
              checked={"<15" in selectedTimes}
              onChange={handleCheckboxChangeTime}
            />
            <Form.Check
              type="checkbox"
              id="15-30"
              label="15-30 minutes"
              value="15-30"
              checked={"15-30" in selectedTimes}
              onChange={handleCheckboxChangeTime}
            />
            <Form.Check
              type="checkbox"
              id="30-60"
              label="30-60 minutes"
              value="30-60"
              checked={"30-60" in selectedTimes}
              onChange={handleCheckboxChangeTime}
            />
            <Form.Check
              type="checkbox"
              id="60-90"
              label="60-90 minutes"
              value="60-90"
              checked={"60-90" in selectedTimes}
              onChange={handleCheckboxChangeTime}
            />
            <Form.Check
              type="checkbox"
              id=">90"
              label="> 90 minutes"
              value=">90"
              checked={">90" in selectedTimes}
              onChange={handleCheckboxChangeTime}
            />
          </div>
          <Button type="submit" className="filters-btn mt-5">
            Apply Filters
          </Button>
        </Container>
      </Form>
    </Container>
  )
}

export default FiltersMenu
