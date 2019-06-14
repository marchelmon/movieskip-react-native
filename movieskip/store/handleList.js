import {
  REMOVE_FROM_EXCLUDED,
  REMOVE_FROM_WATCHLIST,
  SET_EXCLUDED,
  SET_WATCHLIST
 } from '../actions/types';

export const handleList = store => next => action => {
  console.log(`LIST-Action: ${action.type}`);
  switch (action.type) {
    case REMOVE_FROM_EXCLUDED:
      removeFromExcluded(store, action.payload);
      break;
    case REMOVE_FROM_WATCHLIST:
      removeFromWatchlist(store, action.payload);
      break;
    default:
      next(action);
  }
};

//Remove movie from the excluded array in redux
const removeFromExcluded = (store, movieId) => {
  const state = store.getState();
  const newExcluded = removeFromArray(movieId, state.filter.excluded);
  store.dispatch({ type: SET_EXCLUDED, payload: newExcluded });
};

//Remove movie from the watchlist array in redux
const removeFromWatchlist = (store, movieId) => {
  const state = store.getState();
  const newWatchlist = removeFromArray(movieId, state.filter.watchlist);
  store.dispatch({ type: SET_WATCHLIST, payload: newWatchlist });
};

//Finds and removes item from array
const removeFromArray = (itemId, array) => {
   const newArray = array.splice(array.indexOf(itemId), 1);
   return newArray;
};
