import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { createAccount } from "../Services/DataService";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = new useNavigate();

  const [userData, setUserData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    createAccount(userData);
    navigate("/Login");
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="form-container d-flex justify-content-center">
            <Form>
              <p className="text-center">Create Account</p>
              <Form.Group className="mb-3" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="outline-primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateAccount;
