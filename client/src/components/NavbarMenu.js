import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, logout } from "../redux/actions/authAction";
import Modal from "react-bootstrap/Modal";
import { AiOutlineNotification } from "react-icons/ai";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const initialState = {
    oldPassword: "",
    newPassword: "",
    confirm_newPassword: "",
};
const NavbarMenu = () => {
    const { alert, auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [isShowModalChangePassword, setIsShowModalChangePassword] =
        useState(false);

    const handleCloseModalChangePassword = () => {
        setChangePasswordData(initialState);
        setIsShowModalChangePassword(false);
    };
    const handleShowModalChangePassword = () =>
        setIsShowModalChangePassword(true);

    const [changePasswordData, setChangePasswordData] = useState(initialState);

    const { oldPassword, newPassword, confirm_newPassword } =
        changePasswordData;

    const onChangeInput = (e) => {
        setChangePasswordData({
            ...changePasswordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitFormChangePassword = () => {
        handleCloseModalChangePassword();
        dispatch(changePassword({ changePasswordData, auth }));
    };

    return (
        <>
            <Navbar collapseOnSelect bg="light" variant="light">
                <Container>
                    <Nav>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="mb-3"
                                        aria-label="Search"
                                    />
                                </Col>
                                <Col>
                                    <Form.Select>
                                        <option>All</option>
                                        <option>Quizzes</option>
                                        <option>Flashcards</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form>
                    </Nav>
                    <Nav style={{ alignItems: "center", gap: "12px" }}>
                        <NavDropdown
                            title={
                                <img
                                    src={auth.user.avatar}
                                    alt="avatar"
                                    style={{
                                        width: "36px",
                                        height: "36px",
                                        borderRadius: "100px",
                                    }}
                                />
                            }
                            id="collasible-nav-dropdown"
                            align="end"
                        >
                            <NavDropdown.Item as={Link} to={`/profile`}>
                                プロフィール
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={handleShowModalChangePassword}
                            >
                                パスワード変更
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/"
                                onClick={() => dispatch(logout())}
                            >
                                ログアウト
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            title={
                                <AiOutlineNotification></AiOutlineNotification>
                            }
                            id="nofication"
                            align="end"
                        >
                            <NavDropdown.Item>1</NavDropdown.Item>
                            <NavDropdown.Item>2</NavDropdown.Item>
                            <NavDropdown.Item>3</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>

            {/* Modal change password */}
            <Modal
                show={isShowModalChangePassword}
                onHide={handleCloseModalChangePassword}
            >
                <Modal.Header closeButton>
                    <Modal.Title>パスワード変更</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                    >
                        <Form.Group controlId="formBasicOldPassword">
                            <Form.Label>古いパスワード</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Old Password"
                                name="oldPassword"
                                onChange={onChangeInput}
                                value={oldPassword}
                            />
                            <Form.Text className="text-danger">
                                {alert.oldPassword ? alert.oldPassword : ""}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicNewPassword">
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
                        <Form.Group controlId="formBasicConfirmNewPassword">
                            <Form.Label>新しいパスワード（確認用）</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                name="confirm_newPassword"
                                onChange={onChangeInput}
                                value={confirm_newPassword}
                            />
                            <Form.Text className="text-danger">
                                {alert.confirm_newPassword
                                    ? alert.confirm_newPassword
                                    : ""}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={handleSubmitFormChangePassword}
                    >
                        保存
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleCloseModalChangePassword}
                    >
                        キャンセル
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NavbarMenu;
