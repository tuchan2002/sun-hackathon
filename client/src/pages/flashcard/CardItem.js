import Card from "react-bootstrap/Card";
import classes from "./CardItem.module.css";

const CardItem = ({ japaneseWord, vietnameseWord }) => {
  return (
    <Card bsPrefix={classes["card"]}>
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
