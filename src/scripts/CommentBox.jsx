import React from 'react';
import marked from 'marked';
// import AwesomeComponent from './AwesomeComponent.jsx';

const Comment = (props) => {
  const rawMarkeup = marked(props.children.toString(), { sanitize: true });
  return (
    <div className="comment">
      <h2 className="commentAuthor">{props.author}</h2>
      <span dangerouslySetInnerHTML={{__html: rawMarkeup}} />
    </div>
  );
};

Comment.propTypes = {
  author: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired
};

const CommentList = (props) => {
  const commentNodes = props.data.map((comment) => {
    return (
      <Comment author={comment.author} key={comment.id}>
        {comment.text}
      </Comment>
    );
  });
  return (
    <div className="commentList">
      {commentNodes}
    </div>
  );
};

const CommentForm = () =>
  <div>comment form</div>;

class CommentBox extends React.Component {
  static get propTypes() { return { data: React.PropTypes.array }; }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
}

export default CommentBox;
