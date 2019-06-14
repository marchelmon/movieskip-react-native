import {
  SET_EXCLUDED,
  REMOVE_FROM_EXCLUDED,
  SET_WATCHLIST,
  REMOVE_FROM_WATCHLIST
} from './types';

//Update excluded with new list
export const setExcluded = excluded => {
  return { type: SET_EXCLUDED, payload: excluded };
};

//Will remove the movie with the movieId from excluded in redux
export const removeFromExcluded = movieId => {
  return { type: REMOVE_FROM_EXCLUDED, payload: movieId };
};

//Update watchlist with modified/new list
export const addToWatchlist = watchlist => {
  return { type: SET_WATCHLIST, payload: watchlist };
};

//Will remove the movie with the movieId from watchlist in redux
export const removeFromWatchlist = movieId => {
  return { type: REMOVE_FROM_WATCHLIST, payload: movieId };
};
