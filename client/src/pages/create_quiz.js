import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoTrashOutline } from "react-icons/io5";

const questionInitial = {
  content: "",
  answers: [{ content: "" }, { content: "" }, { content: "" }, { content: "" }],
  result: 0,
};
const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { ...questionInitial }]);
  };

  const onChangeQuestionInputContent = (e, index) => {
    const temp = [...questions];
    temp[index].content = e.target.value;
    setQuestions(temp);
  };

  const onChangeAnswerInputContent = (e, questionIndex, answerIndex) => {
    console.log(e.target.value, questionIndex);
    const temp = [...questions];
    temp[questionIndex].answers[answerIndex].content = e.target.value;
    setQuestions(temp);
  };

  const onChangeQuestionInputResult = (result, index) => {
    const temp = [...questions];
    temp[index].result = result;
    setQuestions(temp);
  };

  const handleDeleteQuestion = (idx) => {
    const temp = [...questions];
    setQuestions(temp.filter((question, index) => index !== idx));
  };

  const handleSubmit = () => {
    // {quizTitle, questions}
    console.log("submit");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div
        className="d-flex"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <h2>Add Quizzes</h2>
        <div>
          <Button
            variant="primary"
            disabled={false}
            onClick={handleAddQuestion}
          >
            Add Question
          </Button>
          <Button
            variant="primary"
            disabled={false}
            style={{ marginRight: "16px", marginLeft: "16px" }}
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button variant="secondary" disabled={false}>
            Cancel
          </Button>
        </div>
      </div>
      <Form.Group
        controlId="formBasicQuestionTitle"
        className="d-flex"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Form.Label>Title </Form.Label>
        <Form.Control
          type="text"
          placeholder="Question title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
      </Form.Group>

      {/* questions */}
      {questions.map((question, index) => (
        <Form
          key={index}
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "8px",
            border: "1px solid #ccc",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              flex: 1,
            }}
          >
            <Form.Group
              className="d-flex"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Form.Label>Question: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Question content"
                value={question.content}
                onChange={(e) => onChangeQuestionInputContent(e, index)}
              />
            </Form.Group>
            <Form.Group
              className="d-flex"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Form.Label>Answer1: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Answer 1 content"
                value={question.answers[0].content}
                onChange={(e) => onChangeAnswerInputContent(e, index, 0)}
              />
              <Form.Check
                type="radio"
                name={`result${index}`}
                onChange={() => onChangeQuestionInputResult(0, index)}
                checked={question.result === 0 ? true : false}
              />
            </Form.Group>
            <Form.Group
              className="d-flex"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Form.Label>Answer2: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Answer 2 content"
                value={question.answers[1].content}
                onChange={(e) => onChangeAnswerInputContent(e, index, 1)}
              />
              <Form.Check
                type="radio"
                name={`result${index}`}
                onChange={() => onChangeQuestionInputResult(1, index)}
                checked={question.result === 1 ? true : false}
              />
            </Form.Group>
            <Form.Group
              className="d-flex"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Form.Label>Answer3: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Answer 3 content"
                value={question.answers[2].content}
                onChange={(e) => onChangeAnswerInputContent(e, index, 2)}
              />
              <Form.Check
                type="radio"
                name={`result${index}`}
                onChange={() => onChangeQuestionInputResult(2, index)}
                checked={question.result === 2 ? true : false}
              />
            </Form.Group>
            <Form.Group
              className="d-flex"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Form.Label>Answer4: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Answer 4 content"
                value={question.answers[3].content}
                onChange={(e) => onChangeAnswerInputContent(e, index, 3)}
              />
              <Form.Check
                type="radio"
                name={`result${index}`}
                onChange={() => onChangeQuestionInputResult(3, index)}
                checked={question.result === 3 ? true : false}
              />
            </Form.Group>
          </div>
          <IoTrashOutline
            size={24}
            onClick={() => handleDeleteQuestion(index)}
          />
        </Form>
      ))}
    </div>
  );
};

export default CreateQuiz;
