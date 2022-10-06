import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/actions/authAction";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirm_password: "",
};
const Register = () => {
  const { auth, alert } = useSelector((state) => state);

  const [userData, setUserData] = useState(initialState);
  const { displayName, email, password, confirm_password } = userData;

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
    dispatch(register(userData));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>登録</h1>
      <Form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Form.Group controlId="formBasicDisplayName">
          <Form.Label>表示名</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Display name"
            name="displayName"
            onChange={onChangeInput}
            value={displayName}
          />
          <Form.Text className="text-danger">
            {alert.displayName ? alert.displayName : ""}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>メールアドレス</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={onChangeInput}
            value={email}
          />
          <Form.Text className="text-danger">
            {alert.email ? alert.email : ""}
          </Form.Text>
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
          <Form.Text className="text-danger">
            {alert.password ? alert.password : ""}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>パスワード確認</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            onChange={onChangeInput}
            value={confirm_password}
          />
          <Form.Text className="text-danger">
            {alert.confirm_password ? alert.confirm_password : ""}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          登録
        </Button>
        <div>
          <span>すでにアカウントをお持ちですか？　</span>
          <Link to="/">今すぐログイン</Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
