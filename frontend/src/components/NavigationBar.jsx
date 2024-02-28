import React from "react"
import { CgSearch } from "react-icons/cg"
import "../styles/NavigationBar.css"

const NavigationBar = ({ sessionCookie }) => {
  const userImage = <i className="fa-solid fa-user"></i>

  return (
    <div className="nav-bar-container">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand logo-text" href="/">
            Fridge Feast
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#basic-navbar-nav"
            aria-controls="basic-navbar-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="basic-navbar-nav"
          >
            <ul className="navbar-nav">
              {sessionCookie ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userImage}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item dropdown-text"
                        href="/favourites"
                      >
                        Favourites
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item dropdown-text" href="/logout">
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/signup">
                      Sign Up
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                </>
              )}
              <li className="nav-item">
                <a className="nav-link" href="/search">
                  <CgSearch />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar
