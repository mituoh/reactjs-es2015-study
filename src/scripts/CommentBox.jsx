import React from 'react';
import $ from 'jquery';
import CommentList from './CommentList.jsx';
import CommentForm from './CommentForm.jsx';

class CommentBox extends React.Component {
  static get propTypes() {
    return {
      url: React.PropTypes.string,
      pollInterval: React.PropTypes.number,
      comment: React.PropTypes.object
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => { this.setState({ data }); },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  handleCommentSubmit(comment) {
    const comments = this.state.data;
    const newComments = comments.concat([comment]);
    this.setState({ data: newComments });
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (data) => { this.setState({ data }); },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={(e) => this.handleCommentSubmit(e)} />
      </div>
    );
  }
}

export default CommentBox;
