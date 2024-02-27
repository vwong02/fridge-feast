import React, { useState, useEffect, createContext } from "react"
import axios from "axios"

export const FavouritesContext = createContext()

export const FavouritesProvider = ({ children, sessionCookie }) => {
  const [isFav, setIsFav] = useState([])

  useEffect(() => {
    // Only fetch the favourite recipes if the user is logged in
    if (sessionCookie) {
      axios
        .get(`http://localhost:3000/fav/list/${sessionCookie.userid}`)
        .then((response) => {
          // console.log("fav/list response: ", response)

          // Add the IDs of the favourite recipes to the isFav array
          const favIds = response.data.favs.map((recipe) => recipe.recipe_id)
          // console.log("favIds: ", favIds)

          setIsFav(favIds)
        })
        .catch((error) => {
          console.error("Error fetching favourite recipes: ", error)
        })
    }
  }, [sessionCookie])

  const addFavourite = async (recipeid) => {
    try {
      const response = await axios.post(`http://localhost:3000/fav/add`, {
        userid: sessionCookie.userid,
        recipeid: recipeid,
      })
      console.log("addFavourite response: ", response)
      
      setIsFav((prevFavs) => [...prevFavs, recipeid])
    } catch (error) {
      console.error("Error adding recipe to user faves:", error)
    }
  }

  const removeFavourite = async (recipeid) => {
    try {
      const response = await axios.post(`http://localhost:3000/fav/delete`, {
        userid: sessionCookie.userid,
        recipeid: recipeid,
      })
      console.log("removeFavourite response:", response)

      
      setIsFav((prevFavs) => prevFavs.filter((id) => id !== recipeid))
    } catch (error) {
      console.error("Error deleting recipe from user faves:", error)
    }
  }

  return (
    <FavouritesContext.Provider
      value={{ isFav, setIsFav, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  )
}
