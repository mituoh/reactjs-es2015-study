import React from 'react';
import { render } from 'react-dom';
import CommentBox from './CommentBox.jsx';

const App = () => (
  <CommentBox url="/api/comments" pollInterval={2000} />
);

render(<App />, document.getElementById('app'));
