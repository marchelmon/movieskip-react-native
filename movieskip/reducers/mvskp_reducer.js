import {
  SET_MVSKP_PAGES,
  EXCLUDE_MVSKP,
  UPDATE_MVSKP_URL,
  EMPTY_CONTENT,
  ADD_MVSKP_CONTENT
} from '../actions/types';


const INITIAL_STATE = {
  content: [],
  pages: [],
  excluded: [],
  url: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MVSKP_PAGES:
      return { ...state, pages: action.payload };
    case UPDATE_MVSKP_URL:
      return { ...state, url: action.payload };
    case EXCLUDE_MVSKP:
      return { ...state, excluded: state.excluded.concat(action.payload) };
    case ADD_MVSKP_CONTENT:
      return { ...state, content: state.content.concat(action.payload) };
    case EMPTY_CONTENT:
      return { ...INITIAL_STATE, excluded: state.excluded };
    default:
      return state;
  }
};
