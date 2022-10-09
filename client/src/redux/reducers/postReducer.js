import { POST } from "../types";

const initialState = {
  loading: false,
  posts: [],
  post: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case POST.GET_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case POST.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case POST.EDIT_POST:
      return {
        ...state,
        postId: action.payload,
      };
    case POST.DELETE_POST:
      return {
        ...state,
        postId: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
