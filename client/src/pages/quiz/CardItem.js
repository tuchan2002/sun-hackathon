import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const CardItem = ({
  question,
  questionIndex,
  listResultSelected,
  setListResultSelected,
  isDoQuiz,
}) => {
  const onChangeResultSelected = (result) => {
    const temp = [...listResultSelected];
    temp[questionIndex] = result;
    setListResultSelected(temp);
  };
  console.log(listResultSelected);
  return (
    <Card>
      <Card.Header>
        <h6 style={{ marginRight: "8px" }}>
          {`Question ${questionIndex + 1}: `}{" "}
        </h6>
        {question.content}
      </Card.Header>
      <Card.Body>
        <blockquote
          className="blockquote mb-0 d-flex"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            {isDoQuiz ? (
              <Form.Check
                type="radio"
                name={`result${questionIndex}`}
                onChange={() => onChangeResultSelected(0)}
                checked={listResultSelected[questionIndex] === 0 ? true : false}
              />
            ) : (
              "1. "
            )}
            <span>{question.answers[0]}</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {isDoQuiz ? (
              <Form.Check
                type="radio"
                name={`result${questionIndex}`}
                onChange={() => onChangeResultSelected(1)}
                checked={listResultSelected[questionIndex] === 1 ? true : false}
              />
            ) : (
              "2. "
            )}
            <span>{question.answers[1]}</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {isDoQuiz ? (
              <Form.Check
                type="radio"
                name={`result${questionIndex}`}
                onChange={() => onChangeResultSelected(2)}
                checked={listResultSelected[questionIndex] === 2 ? true : false}
              />
            ) : (
              "3. "
            )}
            <span>{question.answers[2]}</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {isDoQuiz ? (
              <Form.Check
                type="radio"
                name={`result${questionIndex}`}
                onChange={() => onChangeResultSelected(3)}
                checked={listResultSelected[questionIndex] === 3 ? true : false}
              />
            ) : (
              "4. "
            )}
            <span>{question.answers[3]}</span>
          </div>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
