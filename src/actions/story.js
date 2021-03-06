import { STORIES_ADD } from '../constants/actionTypes';
import { doBeginLoad, doEndLoad } from './loader';
import fetchStories from '../api/storys';

const doAddStories = stories => ({
  type: STORIES_ADD,
  stories,
});

// NOTE: injecting fetchStories for testability
const doFetchStoriesAsync = (query, doFetchStories = fetchStories) => async dispatch => {
  //TODO: throw error if query == 'break it'
  dispatch(doBeginLoad());
  const response = await doFetchStories(query);
  dispatch(doAddStories(response.hits));
  dispatch(doEndLoad());
};

export {
  doAddStories,
  doFetchStoriesAsync,
};