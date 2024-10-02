import React, { useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([
    { text: 'This is the first comment' },
    { text: 'This is the second comment' },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    setComments([...comments, { text: newComment }]);
    setNewComment('');
  };

  return (
    <div>
      <h2>Comments</h2>
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment-item">
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <div className="add-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default Comments;
