import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authAction";

const NavbarMenu = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">MyBlog</Navbar.Brand>
        <Nav>
          <Form>
            <Form.Control
              type="search"
              placeholder="Search by title..."
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Nav>
        <Nav style={{ alignItems: "center" }}>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/create_post">
            CreatePost
          </Nav.Link>
          <NavDropdown
            title={
              <img
                src={auth.user.avatar}
                alt="avatar"
                style={{ width: "36px", height: "36px", borderRadius: "100px" }}
              />
            }
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item as={Link} to={`/profile`}>
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/"
              onClick={() => dispatch(logout())}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
