import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useContext } from "react"
import { FavouritesContext } from "../hooks/FavContext"


const FavButton = ({ sessionCookie, recipeid }) => {
  const { isFav, addFavourite, removeFavourite, setIsFav } =
    useContext(FavouritesContext)

  const toggleFavourites = () => {
    const isFavourite = isFav.includes(recipeid)
    if (isFavourite) {
      removeFavourite(recipeid).then(() => {
        setIsFav(isFav.filter((id) => id !== recipeid))
      })
    } else {
      addFavourite(recipeid).then(() => {
        setIsFav([...isFav, recipeid])
      })
    }
  }

  return (
    <div
      onClick={toggleFavourites}
      style={{ backgroundColor: "transparent" }}
      className="fav-btn">
      {isFav.includes(recipeid) ? <FaHeart color="red" /> : <FaRegHeart />}
    </div>
  )
}

export default FavButton
