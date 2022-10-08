import Card from "react-bootstrap/Card";

const CardItem = ({ question }) => {
  return (
    <Card>
      <Card.Header>{question.content}</Card.Header>
      <Card.Body>
        <blockquote
          className="blockquote mb-0 d-flex"
          style={{ justifyContent: "space-between" }}
        >
          <p>1. {question.answers[0]}</p>
          <p>2. {question.answers[1]}</p>
          <p>3. {question.answers[2]}</p>
          <p>4. {question.answers[3]}</p>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
