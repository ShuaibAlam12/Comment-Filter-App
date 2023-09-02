import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'; 

function App() {
  const [comments, setComments] = useState([]);
  const [postIdFilter, setPostIdFilter] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/comments'
        );
        setComments(response.data.slice(0, 100));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    fetchComments();
  }, []);

  const filteredComments = comments.filter((comment) =>
    comment.postId.toString().includes(postIdFilter)
  );

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
  
    <div className="app-container">

      <div className="left-panel">
        <input
        className='input-group input-group-lg'
          type="text"
          placeholder="Filter by postId"
          value={postIdFilter}
          onChange={(e) => setPostIdFilter(e.target.value)}
        />
        <div className="post-list">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`post ${
                selectedPost && selectedPost.id === comment.postId
                  ? 'selected'
                  : ''
              }`}
              onClick={() => handlePostClick(comment)}
            >
              <p>{comment.name}</p>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="right-panel">
        {selectedPost && (
          <div className="comment-list">
            <h2>Comments for Post #{selectedPost.postId}</h2>
            {filteredComments
              .filter((comment) => comment.postId === selectedPost.postId)
              .map((comment) => (
                <div key={comment.id} className="comment">
                  <p>{comment.name}</p>
                  <p>{comment.body}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
