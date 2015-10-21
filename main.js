import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';

class MessageList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.messages.map(message => <Message {...message} />)}
      </ul>
    );
  }
}

class Message extends React.Component {
  render() {
    if (this.props.pending) {
      return <li>...</li>;
    }

    return (
      <li><span>{this.props.from}</span>: {this.props.text}</li>
    );
  }
}

class MessageForm extends React.Component {
  render() {
    return (
      <div>
        <input placeholder='message' ref='message'/>
        <button onClick={() => this.props.onSend('foo', this.refs.message.value)}>send</button>
      </div>
    );
  }
}

class ChatWindow extends React.Component {
  render() {
    return (
      <div>
        <MessageList messages={this.props.messages} />
        <MessageForm onSend={(from, text) => this.props.dispatch({
          type: ADD_MESSAGE,
          payload: {
            from,
            text,
          },
        })}/>
      </div>
    );
  }
}

const server = store => next => action => {
  switch (action.type) {
    case ADD_MESSAGE:
      setTimeout(() => {
        store.dispatch({
          type: ACK_MESSAGES,
        });
      }, 1000);
  }
  return next(action);
}

const store = applyMiddleware(server)(createStore)((state, action) => {
  switch (action.type) {
    case ADD_MESSAGE: return {
      messages: state.messages.concat({
        pending: true,
        from: action.payload.from,
        text: action.payload.text,
      }),
    };
    case ACK_MESSAGES: return {
      messages: state.messages.map(message => ({ ...message, pending: false })),
    };
  }
  return state;
}, {
  messages: [{
    from: 'foo',
    text: 'bar',
  }]
});

const WrappedChat = connect(x => x)(ChatWindow);

render(
  <Provider store={store}>
    <WrappedChat />
  </Provider>, document.getElementById('mount'));

const ADD_MESSAGE = 'ADD_MESSAGE';
const ACK_MESSAGES = 'ACK_MESSAGES';
