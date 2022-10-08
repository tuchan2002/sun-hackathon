import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizById } from "../../redux/actions/quizAction";
import Container from "react-bootstrap/Container";
import CardItem from "../quiz/CardItem";
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";

const DoQuiz = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth, quiz } = useSelector((state) => state);

  const [listResultSelected, setListResultSelected] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuizById({ id, auth }));
  }, [dispatch, id]);

  const handleSubmit = async () => {
    let total = 0;
    quiz.quiz?.questions?.forEach((question, index) => {
      if (question.result === listResultSelected[index]) {
        total++;
      }
    });
    await Swal.fire({
      icon: "success",
      text: `Total ${total}/${quiz.quiz?.questions?.length} Questions`,
    });
  };
  return (
    <div>
      <h2>DO QUIZ</h2>
      <h4>{quiz.quiz?.title}</h4>
      <Container style={{ marginTop: "16px" }}>
        {quiz.quiz?.questions?.map((question, index) => (
          <CardItem
            key={index}
            question={question}
            questionIndex={index}
            listResultSelected={listResultSelected}
            setListResultSelected={setListResultSelected}
          ></CardItem>
        ))}
      </Container>
      <Button variant="primary" disabled={false} onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};

export default DoQuiz;
