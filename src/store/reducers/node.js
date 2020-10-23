import {SET_START_NODE, SET_TARGET_NODE} from "../actionTypes"

const DEFAULT_STATE = {
  startNode: 'HELLO IM START NODE',
  targetNode: null
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case SET_START_NODE:
      return {...state, startNode: action.node}
    case SET_TARGET_NODE:
      return {...state, targetNode: action.node}
    default:
      return state
  }
}