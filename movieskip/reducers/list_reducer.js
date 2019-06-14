import {
  SET_EXCLUDED,
  SET_WATCHLIST,
} from '../actions/types';

const INITIAL_STATE = {
  excluded: [],
  watchlist: []
};

//KAN MAN KÖRA vi change opacity att den sätts till 0.4 alltid
//eftersom det endast är om pages är slut för kategorin

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EXCLUDED:
      return { ...state, excluded: action.payload };
      case SET_WATCHLIST:
        return { ...state, watchlist: action.payload };
    default:
      return state;
  }
};
