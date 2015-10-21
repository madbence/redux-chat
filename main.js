import React from 'react';
import { render } from 'react-dom';

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
    return (
      <li><span>{this.props.from}</span>{this.props.text}</li>
    );
  }
}

class MessageForm extends React.Component {
  render() {
    return (
      <div>
        <input placeholder='message' />
        <button>send</button>
      </div>
    );
  }
}

class ChatWindow extends React.Component {
  render() {
    return (
      <div>
        <MessageList messages={this.props.messages} />
        <MessageForm />
      </div>
    );
  }
}

const messages = [{
  from: 'foo',
  text: 'bar',
}]

render(<ChatWindow messages={messages} />, document.getElementById('mount'));
