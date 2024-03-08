import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap"
import "../styles/Login.css"

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [authToken, setAuthToken] = useState(null)
  const APIURL = "http://0.0.0.0:3000/users/auth"
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault()

    axios
      .post(APIURL, { email: email, password: password })
      .then((response) => {
        const returnAuthToken = response.data.authToken
        console.log("login response.data", response.data)
        setAuthToken(returnAuthToken)
        onLogin({ authToken: returnAuthToken, userid: response.data.userid })
        navigate("/")
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          // Email already in use
          console.error(
            "Email is already in use: ",
            error.response.data.message
          )
          // Handle this case by showing an error message to the user
          // For example, you can set an error state to display a message to the user
        } else {
          console.error("Error logging in :", error)
        }
      })
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="login-background">
      <Container>
        <Card className="p-5 m-auto login-card">
          <h2 className="text-center">Login</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              ></Form.Control>
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputGroup>
          </Form>

          <div className="mt-3 text-center">
            <Button variant="primary" type="submit">
              Login
            </Button>

            <div className="mt-3">
              Don't have an account? <a href="/signup">Sign Up</a>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  )

  // return (
  //   <div className="login-background">
  //     <div className="login-container">
  //       <h1 className="login-title">LOG IN</h1>
  //       <form className="login-form" onSubmit={handleSubmit}>
  //         <label htmlFor="email">Email</label>
  //         <input
  //           id="email"
  //           type="email"
  //           placeholder="Example@gmail.com"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           required
  //         />
  //         <div className="password-container">
  //           <label htmlFor="password">Password</label>
  //           <input
  //             id="password"
  //             type={showPassword ? "text" : "password"}
  //             placeholder="Enter your password"
  //             value={password}
  //             onChange={handlePasswordChange}
  //             required
  //           />
  //           <button
  //             type="button"
  //             onClick={() => setShowPassword(!showPassword)}
  //             className="toggle-password-button"
  //           >
  //             {showPassword ? "Hide" : "Show"}
  //           </button>
  //         </div>
  //         <div className="button-container">
  //           <button type="submit" className="login-form-button">
  //             Login
  //           </button>
  //         </div>
  //       </form>

  //       <div className="signup-redirect-container">
  //         <p className="signup-redirect">
  //           Don't have an account? <a href="/signup">Sign Up</a>
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default Login
