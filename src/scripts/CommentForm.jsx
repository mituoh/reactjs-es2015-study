import React from 'react';

class CommentForm extends React.Component {
  static get propTypes() {
    return {
      onCommentSubmit: React.PropTypes.func
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      author: '',
      text: ''
    };
  }

  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const author = this.state.author.trim();
    const text = this.state.text.trim();
    if (!author || !text) return;
    this.props.onCommentSubmit({ author, text });
    this.setState({ author: '', text: '' });
  }

  render() {
    return (
      <form className="commentForm" onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type="text"
          placeholder="Your name..."
          value={this.state.author}
          onChange={(e) => this.handleAuthorChange(e)}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={(e) => this.handleTextChange(e)}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

export default CommentForm;
