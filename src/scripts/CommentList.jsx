import React from 'react';
import marked from 'marked';

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

export default CommentList;
