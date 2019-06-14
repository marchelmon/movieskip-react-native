import axios from 'axios';
import _ from 'lodash';
import {
  GET_CONTENT,
  SET_PAGES,
  HANDLE_CONTENT,
  ADD_NEW_CONTENT,
  PREPARE_CONTENT,
  SET_PRECONTENT,
  SET_CONTENT,
  PRECONTENT_TO_CONTENT
 } from '../actions/types';
 import { BASE_URL } from '../constants/genres';

export const handleFilter = store => next => action => {
  console.log('FILTER-Action: ' + action.type);
  switch (action.type) {
    case HANDLE_CONTENT:
      handleContent(store, action.payload);
      break;
    case GET_CONTENT:
      getContent(store, action.payload);
      break;
    case PREPARE_CONTENT:
      prepareContent(store, action.payload);
      break;
    case ADD_NEW_CONTENT:
      addNewContent(store, action.payload);
      break;
    case PRECONTENT_TO_CONTENT:
      preContentToContent(store);
      break;
    default:
      next(action);
  }
};

//Gets all pages from tmdb with the active filter
//Dispatch GET_CONTENT to add content to display
const handleContent = async (store, filter) => {
  const { pages, content, preContent } = filter;
  if (content.length === 0 && preContent.length === 0) {
    const tmdbResult = await getTmdbResult(filter, null);
    const totalPages = tmdbResult.total_pages;
    const pagesArray = await pagesToArray(totalPages);
    getMoreContent(store, pagesArray);
  } else if (preContent.length < 10) {
    getMoreContent(store, pages);
  } else if (content.length < 5) {
    preContentToContent(store);
  }
};

//Get filter from state since this action will be used later
const getContent = async (store, page) => {
  const state = store.getState();
  const tmdbRes = await getTmdbResult(state.filter, page);
  store.dispatch({ type: PREPARE_CONTENT, payload: tmdbRes.results });
};

const prepareContent = (store, movies) => {
  const state = store.getState();
  const preparedContent = fixContent(movies, state.filter.excluded);
  if (preparedContent.length < 5) {
    getMoreContent(store, state.filter.pages);
  }
  if (preparedContent.length > 0) {
    store.dispatch({ type: ADD_NEW_CONTENT, payload: preparedContent });
  }
};

//Adds to pre-content, dispatch PRECONTENT_TO_CONTENT if content is less than 5 movies
const addNewContent = (store, newContent) => {
  const state = store.getState();
  const { content, preContent } = state.filter;
  let newPreContent = [...preContent].concat(newContent);
  newPreContent = shuffle(newPreContent);
  store.dispatch({ type: SET_PRECONTENT, payload: newPreContent });
  if (content.length < 5) {
    store.dispatch({ type: PRECONTENT_TO_CONTENT });
  }
};

const preContentToContent = (store) => {
  const state = store.getState();
  const { content, preContent, pages } = state.filter;
  for (let i = 0; i < 5; i++) {
    if (preContent.length > 0) {
      content.push(preContent.pop());
    }
  }
  if (preContent.length < 10) {
    getMoreContent(store, pages);
  }
  store.dispatch({ type: SET_PRECONTENT, payload: preContent });
  store.dispatch({ type: SET_CONTENT, payload: content });
};

//Gets and dispatches random page. Dispatch pages to remove selected page from redux state
const getMoreContent = (store, pagesArray) => {
  const state = store.getState();
  if (pagesArray.length > 0) {
    if (state.filter.preContent.length < 10) {
      const { randomPage, pages } = getPage(pagesArray);
      store.dispatch({ type: GET_CONTENT, payload: randomPage });
      store.dispatch({ type: SET_PAGES, payload: pages });
    } else {
      store.dispatch({ type: SET_PAGES, payload: pagesArray });
    }
  } else {
    console.log('There are no more pages with this filter');
  }
};

//Format movies after what is needed
const fixContent = (content, excluded) => {
  const fixedMovies = content.map(movie => {
    if (_.indexOf(excluded, movie.id) !== -1) {
      return null;
    }
    return {
      id: movie.id,
      releaseYear: movie.release_date.substring(0, 4),
      title: movie.title.length > 25 ? `${movie.title.substring(0, 25)}...` : movie.title,
      rating: movie.vote_average,
      votes: movie.vote_count,
      poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      overview: movie.overview,
      genres: movie.genre_ids,
      image: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
    };
  });
return fixedMovies;
};

//Get eveything from the http-req to use for either pages or content
const getTmdbResult = async (filter, page) => {
  try {
    const movieUrl = await getMovieUrl(filter, page);
    const res = await axios(movieUrl);
    return res.data;
  } catch (err) {
    console.log('getMvskpResult: ' + err);
  }
};

//Create tmdb-url, API-request. Either with page number to get content, or without to get total pages
const getMovieUrl = async (filter, page) => {
  const urlPage = page !== null ? `&page=${page.toString()}` : ''; //Hämtar man till pages kommer page inte med i url
  const { yearFrom, yearTo, popular } = filter;
  const rating = popular ? '6' : '0';
  const votes = popular ? '500' : '100';
  const baseUrl = `${BASE_URL}&primary_release_date.gte=${yearFrom}&primary_release_date.lte=${yearTo + 1}`;//+1 since it is less than yearTo
  const url = `${baseUrl}&vote_average.gte=${rating}&vote_count.gte=${votes}&language=en${urlPage}`;
  return url;
};

const getPage = (pages) => {
  const randomPage = pages.pop();
  return { randomPage, pages };
};

const pagesToArray = (totalPages) => {
  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
    if (pages.length === totalPages) {
      shuffle(pages);
      return pages;
    }
  }
  return null;
};

const shuffle = (a) => {
    const newA = a;//No parameter reasign error otherwise
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const x = a[i];
        newA[i] = a[j];
        newA[j] = x;
    }
    return a;
};
