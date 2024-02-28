import React, { useState } from "react"
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
    <div className="container my-4">
      <form className="filter-menu" onSubmit={handleSubmit}>
        <div className="container">
          <p>Filter By:</p>
          <div className="filter-group">
            <h5>Dietary Concern</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="vegan"
                value="vegan"
                checked={"vegan" in selectedConditions}
                onChange={handleCheckboxChangeCondition}
              />
              <label className="form-check-label" htmlFor="vegan">
                Vegan
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="vegetarian"
                value="vegetarian"
                checked={"vegetarian" in selectedConditions}
                onChange={handleCheckboxChangeCondition}
              />
              <label className="form-check-label" htmlFor="vegetarian">
                Vegetarian
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="dairyFree"
                value="dairy free"
                checked={"dairy free" in selectedConditions}
                onChange={handleCheckboxChangeCondition}
              />
              <label className="form-check-label" htmlFor="dairyFree">
                Dairy Free
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="glutenFree"
                value="gluten free"
                checked={"gluten free" in selectedConditions}
                onChange={handleCheckboxChangeCondition}
              />
              <label className="form-check-label" htmlFor="glutenFree">
                Gluten Free
              </label>
            </div>
          </div>
          <div className="filter-group mt-4">
            <h5>Time</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="<15"
                value="<15"
                checked={"<15" in selectedTimes}
                onChange={handleCheckboxChangeTime}
              />
              <label className="form-check-label" htmlFor="<15">
                &lt; 15 minutes
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="15-30"
                value="15-30"
                checked={"15-30" in selectedTimes}
                onChange={handleCheckboxChangeTime}
              />
              <label className="form-check-label" htmlFor="15-30">
                15-30 minutes
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="30-60"
                value="30-60"
                checked={"30-60" in selectedTimes}
                onChange={handleCheckboxChangeTime}
              />
              <label className="form-check-label" htmlFor="30-60">
                30-60 minutes
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="60-90"
                value="60-90"
                checked={"60-90" in selectedTimes}
                onChange={handleCheckboxChangeTime}
              />
              <label className="form-check-label" htmlFor="60-90">
                60-90 minutes
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id=">90"
                value=">90"
                checked={">90" in selectedTimes}
                onChange={handleCheckboxChangeTime}
              />
              <label className="form-check-label" htmlFor=">90">
                &gt; 90 minutes
              </label>
            </div>
          </div>
          <button type="submit" className="btn filters-btn mt-5">
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  )

  // return (
  //   <Container className="my-4">
  //     <Form className="filter-menu" onSubmit={handleSubmit}>
  //       <Container>
  //         <p>Filter By:</p>
  //         <div className="filter-group">
  //           <h5>Dietary Concern</h5>
  //           <Form.Check
  //             type="checkbox"
  //             id="vegan"
  //             label="Vegan"
  //             value="vegan"
  //             checked={"vegan" in selectedConditions}
  //             onChange={handleCheckboxChangeCondition}
  //           />
  //           <Form.Check
  //             type="checkbox"
  //             id="vegetarian"
  //             label="Vegetarian"
  //             value="vegetarian"
  //             checked={"vegetarian" in selectedConditions}
  //             onChange={handleCheckboxChangeCondition}
  //           />
  //           <Form.Check
  //             type="checkbox"
  //             id="dairyFree"
  //             label="Dairy Free"
  //             value="dairy free"
  //             checked={"dairy free" in selectedConditions}
  //             onChange={handleCheckboxChangeCondition}
  //           />
  //           <Form.Check
  //             type="checkbox"
  //             id="glutenFree"
  //             label="Gluten Free"
  //             value="gluten free"
  //             checked={"gluten free" in selectedConditions}
  //             onChange={handleCheckboxChangeCondition}
  //           />
  //         </div>
  //         <div className="filter-group mt-4">
  //           <h5>Time</h5>
  //           <Form.Check
  //             type="checkbox"
  //             id="<15"
  //             label="< 15 minutes"
  //             value="<15"
  //             checked={"<15" in selectedTimes}
  //             onChange={handleCheckboxChangeTime}
  //           />
  //           <Form.Check
  //             type="checkbox"
  //             id="15-30"
  //             label="15-30 minutes"
  //             value="15-30"
  //             checked={"15-30" in selectedTimes}
  //             onChange={handleCheckboxChangeTime}
  //           />
  //           <Form.Check
  //             type="checkbox"
  //             id="30-60"
  //             label="30-60 minutes"
  //             value="30-60"
  //             checked={"30-60" in selectedTimes}
  //             onChange={handleCheckboxChangeTime}
  //           />
  //           <Form.Check
  //             type="checkbox"
  //             id="60-90"
  //             label="60-90 minutes"
  //             value="60-90"
  //             checked={"60-90" in selectedTimes}
  //             onChange={handleCheckboxChangeTime}
  //           />
  //           <Form.Check
  //             type="checkbox"
  //             id=">90"
  //             label="> 90 minutes"
  //             value=">90"
  //             checked={">90" in selectedTimes}
  //             onChange={handleCheckboxChangeTime}
  //           />
  //         </div>
  //         <Button type="submit" className="filters-btn mt-5">
  //           Apply Filters
  //         </Button>
  //       </Container>
  //     </Form>
  //   </Container>
  // )
}

export default FiltersMenu
