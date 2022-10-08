import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { GiCardPick } from "react-icons/gi";
import CardItem from "./CardItem";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import classes from "./BoxTitle.module.css";

import {
  getFlashcardById,
  deleteFlashcardById,
} from "../../redux/actions/flashcardAction";

const FlashcardDetail = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { auth, flashcard } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlashcardById({ id, auth }));
  }, [dispatch, id, auth]);

  const handleDeleteFlashcardById = () => {
    dispatch(deleteFlashcardById({ id, auth }));
    navigate("/my-library");
  };

  return (
    <>
      <Card bsPrefix={classes["card"]}>
        <Card.Header bsPrefix={classes["card-header"]}>Flashcard</Card.Header>
        <Card.Body bsPrefix={classes["card-body"]}>
          <Card.Title bsPrefix={classes["title"]}>
            {flashcard.flashcard?.title}
          </Card.Title>
          <Container bsPrefix={classes["container"]}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>
                <img
                  src={auth.user.avatar}
                  alt="avatar"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "100px",
                    marginRight: "8px",
                  }}
                />
                {auth.user.displayName}
              </span>
            </div>
            <div>
              <Button
                onClick={() => {
                  navigate(`/do_flashcard/${flashcard.flashcard?._id}`, {
                    replace: true,
                  });
                }}
                variant="primary"
              >
                Learn
              </Button>{" "}
              <Button variant="primary">Edit</Button>{" "}
              <Button variant="danger" onClick={handleDeleteFlashcardById}>
                Delete
              </Button>{" "}
            </div>
          </Container>
        </Card.Body>
      </Card>
      <Container style={{ marginTop: "16px" }}>
        <h3>
          {" "}
          <GiCardPick style={{ marginRight: "8px" }} />
          {flashcard.flashcard?.Cards.length} Cards
        </h3>
      </Container>
      <Container style={{ marginTop: "16px", paddingLeft: 0, paddingRight: 0 }}>
        {flashcard.flashcard?.Cards.map((data, index) => (
          <CardItem
            key={index}
            vietnameseWord={data.vietnameseWord}
            japaneseWord={data.japaneseWord}
          />
        ))}
      </Container>
    </>
  );
};

export default FlashcardDetail;
