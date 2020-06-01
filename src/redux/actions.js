import {TABLE_RESIZE, CHANGE_TEXT} from './types';

// Action Creator
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

// Action Creator
export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}
