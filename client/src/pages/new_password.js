import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { setNewPassword } from "../redux/actions/authAction";
import { useParams } from "react-router-dom";

const NewPassword = () => {
  const { alert } = useSelector((state) => state);

  const { resetToken } = useParams();

  const [newPasswordData, setNewPasswordData] = useState({
    newPassword: "",
    confirm_newPassword: "",
  });

  const { newPassword, confirm_newPassword } = newPasswordData;

  const onChangeInput = (e) => {
    setNewPasswordData({ ...newPasswordData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setNewPassword({ ...newPasswordData, resetToken }));
  };
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>パスワード設定</h1>
      <Form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Form.Group controlId="formBasicPassword">
          <Form.Label>新しいパスワード</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="newPassword"
            onChange={onChangeInput}
            value={newPassword}
          />
          <Form.Text className="text-danger">
            {alert.newPassword ? alert.newPassword : ""}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>新しいパスワード（確認用）</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirm_newPassword"
            onChange={onChangeInput}
            value={confirm_newPassword}
          />
          <Form.Text className="text-danger">
            {alert.confirm_newPassword ? alert.confirm_newPassword : ""}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          保存
        </Button>
      </Form>
    </div>
  );
};

export default NewPassword;
