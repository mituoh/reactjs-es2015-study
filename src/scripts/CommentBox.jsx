import React from 'react';
import marked from 'marked';
import $ from 'jquery';
// import AwesomeComponent from './AwesomeComponent.jsx';

const Comment = (props) => {
  const rawMarkeup = marked(props.children.toString(), { sanitize: true });
  return (
    <div className="comment">
      <h2 className="commentAuthor">{props.author}</h2>
      <span dangerouslySetInnerHTML={{ __html: rawMarkeup }} />
    </div>
  );
};

Comment.propTypes = {
  author: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired
};

const CommentList = (props) => {
  const commentNodes = props.data.map((comment) => (
    <Comment author={comment.author} key={comment.id}>
      {comment.text}
    </Comment>
  ));
  return (
    <div className="commentList">
      {commentNodes}
    </div>
  );
};

CommentList.propTypes = {
  data: React.PropTypes.array
};

const CommentForm = () =>
  <div>comment form</div>;

class CommentBox extends React.Component {
  static get propTypes() {
    return {
      url: React.PropTypes.string,
      pollInterval: React.PropTypes.number
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

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
}

export default CommentBox;
