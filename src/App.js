// File: src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from "./Components/store";
import PostsList from "./Features/posts/PostList";
import PostForm from "./Features/posts/PostForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="container mt-4">
        <h1 className="text-center fw-bold mb-4">Posts CRUD App</h1>

        <div className="mb-4 p-4  border rounded addContainer">
          <h2 className="h4 fw-semibold mb-3">Add New Post</h2>
          
          <PostForm />
        </div>

        <div>
          <h2 className="h4 fw-semibold mb-3">Posts List</h2>
          <PostsList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
