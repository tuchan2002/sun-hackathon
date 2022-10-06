import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendMailResetPassword } from "../redux/actions/authAction";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sendMailResetPassword({
        email,
        urlNewPW: "http://localhost:3000/new_password",
      })
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>パスワードリセット</h1>
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={email ? false : true}>
          <BsFillArrowRightCircleFill /> 送信
        </Button>
        <Link to="/">ログイン画面に戻る</Link>
      </Form>
    </div>
  );
};

export default ResetPassword;
