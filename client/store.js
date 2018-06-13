import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios'

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const NEW_AUTHOR = 'NEW_AUTHOR';

const initialState = {
  messages : [],
  newMessageEntry : '',
  name : ''
}

export const gotMessagesFromServer = (messages) => {
  return {
    type : GOT_MESSAGES_FROM_SERVER,
    messages
  }
}

export const writeMessage = (newMessageEntry) => {
  return {
    type : WRITE_MESSAGE,
    newMessageEntry
  }
}

export const gotNewMessageFromServer = (message) => {
  return {
    type : GOT_NEW_MESSAGE_FROM_SERVER,
    message
  }
}

export const newAuthor = (name) => {
  return {
    type : NEW_AUTHOR,
    name
  }
}

export const fetchMessages = () => {
  return dispatch => {
    return axios.get('/api/messages')
    .then(res => res.data)
    .then(messages => dispatch(gotMessagesFromServer(messages)))
    .catch(err => console.error(`Unable to retrieve messages ${err}`))
  }
}

export const postMessage = (content, channelId) => {
  return dispatch => {
    return axios.post(`/api/messages`, { content , channelId })
    .then(res => dispatch(gotNewMessageFromServer(res.data)))
    .catch(err => console.error(`Unable to create new message entry ${err}`))
  }
}

function messageList (state = initialState, action) {
  switch(action.type){
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages : action.messages }

    case WRITE_MESSAGE:
      return { ...state, newMessageEntry : action.newMessageEntry }

    case GOT_NEW_MESSAGE_FROM_SERVER:
      return { ...state,  messages : [...state.messages, action.message]}

    default:
      return state
  }
}

const store = createStore(messageList, 
  composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger())))
export default store