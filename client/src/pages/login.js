import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const initialState = { email: "", password: "" };
const Login = () => {
  const { auth } = useSelector((state) => state);

  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const onChangeInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  }, [auth.token, navigate]);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={onChangeInput}
          value={email}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChangeInput}
          value={password}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <div className="mb-3">
        <span>You don't have an account? </span>
        <Link to="/register">Register Now</Link>
      </div>
    </Form>
  );
};

export default Login;
