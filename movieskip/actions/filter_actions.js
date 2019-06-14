import {
  HANDLE_CONTENT,
  UPDATE_FILTER,
  SET_CONTENT,
} from './types';

//Update filter and get new content from TMDB
export const updateFilter = filter => {
  return { type: UPDATE_FILTER, payload: filter };
};

//Get pages? Get content? Transfer from preContent to content?
export const handleContent = filter => {
  return { type: HANDLE_CONTENT, payload: filter };
};

export const updateContent = content => {
  return { type: SET_CONTENT, payload: content };
};
