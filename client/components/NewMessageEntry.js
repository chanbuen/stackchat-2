import React, { Component } from 'react';
import axios from 'axios';
import store, { writeMessage, gotNewMessageFromServer, postMessage } from '../store'

export default class NewMessageEntry extends Component {
  constructor(){
    super()
    this.state = store.getState()
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  handleChange = (event) => {
    store.dispatch(writeMessage(event.target.value))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    store.dispatch(postMessage(this.state.newMessageEntry, this.props.channelId))

  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            onChange={this.handleChange}
            value={this.state.newMessageEntry}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
