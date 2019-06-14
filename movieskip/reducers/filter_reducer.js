import {
  UPDATE_FILTER,
  SET_PAGES,
  SET_PRECONTENT,
  SET_CONTENT,
} from '../actions/types';
import { ALL_GENRES } from '../constants/genres';

const INITIAL_STATE = {
  yearFrom: 2000,
  yearTo: 2019,
  popular: false,
  genres: ALL_GENRES,
  pages: [],
  preContent: [],
  content: []
};

//SET filter, pages, content or preConent
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return action.payload;//NEW FILTER
    case SET_PAGES:
      return { ...state, pages: action.payload };
    case SET_PRECONTENT:
      return { ...state, preContent: action.payload };
    case SET_CONTENT:
      return { ...state, content: action.payload };
    default:
      return state;
  }
};
