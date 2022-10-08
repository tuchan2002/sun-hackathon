import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getQuizsByUserId } from "../redux/actions/quizAction";
import { getFlashcardsByUserId } from "../redux/actions/flashcardAction";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsQuestionCircleFill } from "react-icons/bs";
import { GiCardPick } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import classes from "./mylibrary.module.css";

const MyLibrary = () => {
  const [filter, setFilter] = useState("quizzes");
  const { auth, flashcard, quiz } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuizsByUserId({ auth }));
    dispatch(getFlashcardsByUserId({ auth }));
  }, [dispatch, auth]);

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleOnClickCreate = (e) => {
    Swal.fire({
      title: "Which do you want to create ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Quizz",
      denyButtonText: `Flashcard`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate("/create_quiz");
      } else if (result.isDenied) {
        navigate("/create_flashcard");
      }
    });
  };

  return (
    <>
      <div className={classes.container}>
        <h3>My Library</h3>
        <div>
          <Form.Select
            style={{ width: "180px", display: "inline-block" }}
            onChange={(e) => handleChangeFilter(e)}
          >
            <option value={"quizzes"}>Quizzes</option>
            <option value={"flashcards"}>Flashcards</option>
          </Form.Select>{" "}
          <Button
            variant="primary"
            onClick={handleOnClickCreate}
            style={{ transform: "translateY(-3px)" }}
          >
            Create
          </Button>
        </div>
      </div>
      <div className="mt-4">
        {filter === "quizzes" ? (
          <Row md={4}>
            {quiz.quizzes.map((item, index) => (
              <Col
                key={index}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Card bsPrefix={classes["card"]}>
                  <Card.Img
                    variant="top"
                    src="https://quizizz.com/media/resource/gs/quizizz-media/quizzes/fe37cb45-e033-47b0-8c8a-c4d5437e6ecb?w=200&h=200"
                  />
                  <Card.Body bsPrefix={classes["card-body"]}>
                    <Card.Title className={classes["card-title"]}>
                      {item.title}
                    </Card.Title>
                    <div className={classes.box}>
                      <Card.Text>
                        <span className={classes.question}>
                          <BsQuestionCircleFill />
                          <p className={classes.subContent}>
                            {item.questions.length}
                          </p>
                          <p className={classes.subContent}>Questions</p>
                        </span>
                      </Card.Text>
                      <Button
                        onClick={() =>
                          navigate(`/quiz/${item._id}`, {
                            replace: true,
                          })
                        }
                        variant="primary"
                      >
                        View Quizz
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row md={4}>
            {flashcard.flashcards.map((item, index) => (
              <Col
                key={index}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Card bsPrefix={classes["card"]}>
                  <Card.Img
                    variant="top"
                    src="https://play-lh.googleusercontent.com/23G-2LOEXXPeTjElWnYOuacOuk6D8-sL300sl-e-ZTeSmBSKYDR2Y7kXVh3A5lxbKUmX"
                  />
                  <Card.Body bsPrefix={classes["card-body"]}>
                    <Card.Title className={classes["card-title"]}>
                      {item.title}
                    </Card.Title>
                    <div className={classes.box}>
                      <Card.Text>
                        <span className={classes.question}>
                          <GiCardPick style={{ marginRight: "8px" }} />
                          <p className={classes.subContent}>
                            {item.Cards.length}
                          </p>
                          <p className={classes.subContent}>Cards</p>
                        </span>
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() =>
                          navigate(`/flashcard/${item._id}`, {
                            replace: true,
                          })
                        }
                      >
                        View Decks
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default MyLibrary;
