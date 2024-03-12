import { useState } from "react"
import "../styles/Signup.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Form,
  Button,
  Card,
  InputGroup,
  Alert,
} from "react-bootstrap"
import toast from "react-hot-toast"

// TODO : Setup : Once user login, redirect to homepage (not showing signup page)
const Signup = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // const [passwordWarning, setPasswordWarning] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  const APIURL = "http://0.0.0.0:3000/users/save"
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post(APIURL, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then((response) => {
        toast.success("Account created successfully. Please log in.")
        navigate("/login")
      })
      .catch((error) => {
        if (error.response.status == 409) {
          toast.error("Email already in use. Please log in or try another email.")
        } else {
          toast.error("Error signing up. Please try again later.")
        }
      })
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="signup-background">
      <Container>
        <Card className="px-5 py-4 mx-auto my-5 signup-card">
          <h2 className="text-center">Sign Up</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  id="first-name"
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  id="last-name"
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="Example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Must be at least 8 characters"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                  autoComplete="auto"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* {passwordWarning && (
              <div className="password-warning">{passwordWarning}</div>
            )} */}

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="auto"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="toggle-password-button"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>

          <div className="mt-3 text-center">
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
              style={{ width: "fit-content" }}
            >
              Sign up
            </Button>
          </div>
          <div className="mt-3 text-center">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default Signup
