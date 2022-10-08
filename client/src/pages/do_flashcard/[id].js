import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FlashcardArray } from "react-quizlet-flashcard";
import classes from "./DoFlashcard.module.css";

import { getFlashcardById } from "../../redux/actions/flashcardAction";

const DoFlashcard = () => {
  const { id } = useParams();
  const { auth, flashcard } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlashcardById({ id, auth }));
  }, [dispatch, id, auth]);

  console.log(flashcard);

  return (
    <div className={classes.container}>
      <h3 className={classes.topic}>Flashcard</h3>
      <h2 className={classes.title}>{flashcard.flashcard?.title}</h2>
      <FlashcardArray
        cards={flashcard.flashcard?.Cards.map((card, index) => ({
          id: index + 1,
          front: card.japaneseWord,
          back: card.vietnameseWord,
        }))}
      />
    </div>
  );
};

export default DoFlashcard;
