import React from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { CgSearch } from "react-icons/cg"
import "../styles/NavigationBar.css"

const NavigationBar = ({ sessionCookie }) => {
  const userImage = <i className="fa-solid fa-user"></i>

  return (
    <div className="nav-bar-container">
      <Navbar>
        <Container>
          <Navbar.Brand href="/" className="logo-text">
            Fridge Feast
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end">
            <Nav>
              {sessionCookie ? (
                <NavDropdown title={userImage}>
                  <NavDropdown.Item
                    href="/favourites"
                    className="dropdown-text">
                    Favourites
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item href="/pantry" className="dropdown-text">
                    Pantry
                   </NavDropdown.Item> */}
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout" className="dropdown-text">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}
              <Nav.Link href="/search">
                <CgSearch />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavigationBar

