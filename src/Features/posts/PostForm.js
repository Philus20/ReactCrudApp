// File: src/features/posts/PostForm.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewPost, updatePost } from "./postsSlice";
import './post.css';
const PostForm = ({ post, onCancel, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) return;

    if (post) {
      dispatch(
        updatePost({
          id: post.id,
          title,
          body,
          userId: post.userId,
        })
      );
      // Call both callbacks if provided
      if (onSuccess) onSuccess();
      else if (onCancel) onCancel();
    } else {
      dispatch(
        addNewPost({
          title,
          body,
          userId: 1, // Using a default userId
        })
      );
      if (onSuccess) onSuccess();
      setTitle("");
      setBody("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container p-4 border-0">
      <div className="mb-3 post-container">
        <label htmlFor="postTitle" className="form-label fw-bold">
          Title:
        </label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="postBody" className="form-label fw-bold">
          Content:
        </label>
        <textarea
          id="postBody"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="form-control"
          rows="4"
          required
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-dark">
          {post ? "Update Post" : "Add Post"}
        </button>

        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;