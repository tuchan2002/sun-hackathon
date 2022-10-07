import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const EditFlashcard = () => {
    let navigate = useNavigate();

    const handleClickCancel = (e) => {
        navigate("/my-library");
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "12px",
                }}
            >
                <h2
                    style={{
                        display: "inline-block",
                        margin: "0px",
                    }}
                >
                    Edit Flashcard
                </h2>
                <div style={{ alignItem: "center", display: "inline-block" }}>
                    <Button variant="primary">Add Card</Button>{" "}
                    <Button variant="primary">Save</Button>{" "}
                    <Button
                        onClick={() => handleClickCancel()}
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditFlashcard;
