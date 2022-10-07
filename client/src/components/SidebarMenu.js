import Nav from "react-bootstrap/Nav";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineLibraryBooks } from "react-icons/md";

const SidebarMenu = () => {
    return (
        <>
            <Nav
                className="flex-column"
                style={{
                    width: "200px",
                    minHeight: "756px",
                    padding: "10px",
                    borderRight: "1px solid black",
                }}
            >
                <h2>PROJECT</h2>
                <Nav.Link href="/home">
                    <AiOutlineHome /> Home
                </Nav.Link>
                <Nav.Link href="/mylibrary">
                    <MdOutlineLibraryBooks />
                    My Library
                </Nav.Link>
                <Nav.Link href="/posts">
                    <AiOutlineQuestionCircle />
                    Posts
                </Nav.Link>
            </Nav>
        </>
    );
};

export default SidebarMenu;
