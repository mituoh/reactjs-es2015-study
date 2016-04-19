import React from 'react';
import { render } from 'react-dom';
import CommentBox from './CommentBox.jsx';

const data = [
  { id: 1, author: 'Pete Hunt', text: 'This is one comment' },
  { id: 2, author: 'Jordan Walke', text: 'This is *another* comment' }
];

const App = () => (
  <CommentBox data={data} />
);

render(<App />, document.getElementById('app'));
