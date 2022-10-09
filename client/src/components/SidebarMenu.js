import Nav from "react-bootstrap/Nav";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { Link } from "react-router-dom";

import classes from "./SidebarMenu.module.css";

const SidebarMenu = () => {
  return (
    <>
      <Nav bsPrefix={classes["flex-column"]}>
        <h2 className={classes["project-name"]}>PROJECT</h2>
        <div className={classes.links}>
          <Nav.Link as={Link} to="/home" bsPrefix={classes["link"]}>
            <AiOutlineHome size={"20px"} color={"#228be6"} />
            <h5>Home</h5>
          </Nav.Link>
          <Nav.Link as={Link} to="/mylibrary" bsPrefix={classes["link"]}>
            <MdOutlineLibraryBooks size={"20px"} color={"#228be6"} />
            <h5>My Library</h5>
          </Nav.Link>
          <Nav.Link as={Link} to="/posts" bsPrefix={classes["link"]}>
            <AiOutlineQuestionCircle size={"20px"} color={"#228be6"} />
            <h5>Posts</h5>
          </Nav.Link>
        </div>
      </Nav>
    </>
  );
};

export default SidebarMenu;
