import { FLASHCARD } from "../types";

const initialState = {
    loading: false,
    flashcard: {
        Cards: [],
        title: "",
    },
};

const flashcardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FLASHCARD.CREATE_FLASHCARD:
            return {
                ...state,
                flashcard: action.payload,
            };
        case FLASHCARD.GET_FLASHCARD:
            return {
                ...state,
                flashcard: action.payload,
            };
        case FLASHCARD.GET_FLASHCARDS:
            return {
                ...state,
                flashcards: action.payload,
            };
        case FLASHCARD.DELETE_FLASHCARD:
            return {
                ...state,
                flashcard: state.flashcard.filter(
                    (item) => item._id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export default flashcardReducer;
