import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { BsQuestionCircleFill } from "react-icons/bs";
import CardItem from "./CardItem";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../redux/actions/quizAction";
import { useEffect, useState } from "react";

const question = {
  content: "content quiz 123",
  answers: ["ha noi", "nam dinh", "bac ninh", "hai phong"],
  result: 0,
};

const QuizDetail = () => {
  const { id } = useParams();
  const { auth, quiz } = useSelector((state) => state);
  const [detailQuiz, setDetailQuiz] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuizById({ id, auth }));

    console.log(quiz.quiz.quiz);

    setDetailQuiz(quiz.quiz.quiz);
  }, [detailQuiz, dispatch, id, auth]);
  return (
    <>
      <Card>
        <Card.Header> {detailQuiz?.title}</Card.Header>
        <Card.Body>
          <Card.Title style={{ marginBottom: "36px" }}>
            {detailQuiz?.title}
          </Card.Title>
          <Container>
            <Row>
              <Col>
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
              </Col>
              <Col>
                <Button variant="primary">Learn</Button>{" "}
                <Button variant="info">Share</Button>{" "}
                <Button variant="primary">Edit</Button>{" "}
                <Button variant="danger">Delete</Button>{" "}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <Container style={{ marginTop: "16px" }}>
        <h3>
          {" "}
          <BsQuestionCircleFill style={{ marginRight: "8px" }} />
          {detailQuiz?.answers?.length} Questions
        </h3>
      </Container>
      <Container style={{ marginTop: "16px" }}>
        {detailQuiz?.questions?.map((question) => (
          <CardItem question={question}></CardItem>
        ))}
      </Container>
    </>
  );
};

export default QuizDetail;
