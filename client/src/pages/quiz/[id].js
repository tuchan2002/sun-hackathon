import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { BsQuestionCircleFill } from "react-icons/bs";
import CardItem from "./CardItem";
import { useNavigate, useParams } from "react-router-dom";
import { deleteQuizById, getQuizById } from "../../redux/actions/quizAction";
import { useEffect, useState } from "react";
import classes from "../flashcard/BoxTitle.module.css";

const QuizDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth, quiz } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuizById({ id, auth }));
  }, [dispatch, id]);

  const handleDeleteQuizById = () => {
    dispatch(deleteQuizById({ id, auth }));
  };

  return (
    <>
      <Card bsPrefix={classes["card"]}>
        <Card.Header bsPrefix={classes["card-header"]}>
          {" "}
          {quiz.quiz?.title}
        </Card.Header>
        <Card.Body bsPrefix={classes["card-body"]}>
          <Card.Title bsPrefix={classes["title"]}>
            {" "}
            {quiz.quiz?.title}
          </Card.Title>
          <Container bsPrefix={classes["containerr"]}>
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
              <div>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/do_quiz/${id}`)}
                >
                  Learn
                </Button>{" "}
                <Button variant="info">Share</Button>{" "}
                {quiz.quiz?.user === auth.user._id && (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/edit_quiz/${id}`)}
                    >
                      Edit
                    </Button>{" "}
                    <Button variant="danger" onClick={handleDeleteQuizById}>
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Container>
        </Card.Body>
      </Card>
      <Container style={{ marginTop: "16px" }}>
        <h3>
          {" "}
          <BsQuestionCircleFill style={{ marginRight: "8px" }} />
          {quiz.quiz?.questions?.length} Questions
        </h3>
      </Container>
      <Container style={{ marginTop: "16px", paddingLeft: 0, paddingRight: 0 }}>
        {quiz.quiz?.questions?.map((question, index) => (
          <CardItem
            key={index}
            question={question}
            questionIndex={index}
          ></CardItem>
        ))}
      </Container>
    </>
  );
};

export default QuizDetail;
