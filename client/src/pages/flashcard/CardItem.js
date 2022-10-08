import Card from "react-bootstrap/Card";

const CardItem = ({ japaneseWord, vietnameseWord }) => {
  return (
    <Card>
      <Card.Header>{japaneseWord}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{vietnameseWord}</p>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
