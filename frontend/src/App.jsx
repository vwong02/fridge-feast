import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { CookiesProvider, useCookies } from "react-cookie"
import { Toaster } from "react-hot-toast"
import Signup from "./routes/Signup"
import Login from "./routes/Login"
import Logout from "./routes/Logout"
import SearchResults from "./routes/Search"
import ProtectedRoute from "./routes/ProtectedRoute"
import Homepage from "./routes/Homepage"
import RecipePage from "./routes/RecipePage"
import NavigationBar from "./components/NavigationBar"
import FavouritesPage from "./routes/FavouritesPage"
import { FavouritesProvider } from "./hooks/FavContext"
import "./styles/App.css"

// Redirect to homepage (if already logged in)
const RedirectTo = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const makeDelay = setTimeout(() => {
      navigate("/")
    }, 100)
    return () => clearTimeout(makeDelay)
  }, [navigate])

  return <></>
}

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"])

  function handleLogin(userIdAndAuthToken) {
    setCookie("user", userIdAndAuthToken, { path: "/", maxAge: 24 * 60 * 60 })
  }

  function handleLogout() {
    setCookie("user", null, { path: "/" })
    removeCookie("user", { path: "/" })
  }

  return (
    <div className="app-container">
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          duration: 3000,
        }}
      />
      <FavouritesProvider sessionCookie={cookies.user}>
        <NavigationBar sessionCookie={cookies.user} />
        <CookiesProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/signup"
                element={cookies.user == null ? <Signup /> : <RedirectTo />}
              />
              <Route
                path="/login"
                element={
                  cookies.user == null ? (
                    <Login onLogin={handleLogin} />
                  ) : (
                    <RedirectTo />
                  )
                }
              />
              <Route
                path="/search"
                element={<SearchResults sessionCookie={cookies.user} />}
              />
              <Route element={<ProtectedRoute currentUser={cookies.user} />}>
                <Route
                  path="/favourites"
                  element={<FavouritesPage sessionCookie={cookies.user} />}
                />
              </Route>
              <Route
                path="/"
                element={<Homepage sessionCookie={cookies.user} />}
              />
              <Route
                path="/logout"
                element={<Logout onLogout={handleLogout} />}
              />
              <Route
                path="/recipes/:id"
                element={<RecipePage sessionCookie={cookies.user} />}
              />
            </Routes>
          </BrowserRouter>
        </CookiesProvider>
      </FavouritesProvider>
    </div>
  )
}

export default App
