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
    <div>
      <h1 style={{ textAlign: "center" }}>ログイン</h1>
      <Form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>メールアドレス</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={onChangeInput}
            value={email}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>パスワード</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeInput}
            value={password}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={email && password ? false : true}
        >
          ログイン
        </Button>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span>アカウントを持っていませんか？　</span>
            <Link to="/register">今すぐ登録！</Link>
          </div>
          <Link to="/reset_password">パスワードをお忘れの方はこちら</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
