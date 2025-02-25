// File: src/features/posts/PostsList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from './postsSlice';
import PostForm from './PostForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './post.css';
import { Modal, Button } from 'react-bootstrap';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  // State for modals
  const [editingPost, setEditingPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  // Edit handlers
  const handleEdit = (post) => {
    setEditingPost(post);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingPost(null);
  };

  // Delete handlers
  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (postToDelete) {
      dispatch(deletePost(postToDelete.id));
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  let content;

  if (status === 'loading') {
    content = <div className="text-center py-4">Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <div className="container mt-4">
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text flex-grow-1 " >{post.body}</p>
                  <div className="d-flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(post)}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(post)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (status === 'failed') {
    content = <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      {content}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingPost && (
            <PostForm 
              post={editingPost} 
              onCancel={handleCloseEditModal}
              onSuccess={handleCloseEditModal} 
            />
          )}
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post?
          {postToDelete && (
            <div className="mt-3">
              <strong>"{postToDelete.title}"</strong>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostsList;