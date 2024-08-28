
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';
import SearchPosts from './features/posts/SearchPosts';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import PrivateRoute from './features/auth/PrivateRoute';
import Footer from './components/footer';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <Router>
      <Header />
        {/* Toaster component for react-hot-toast */}
        <Toaster position='top-center' reverseOrder={false} />
      <main className="container h-full p-4 mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <SearchPosts />
                <PostsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-post"
            element={
              <PrivateRoute>
                <AddPostForm />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
     <Footer/>
    </Router>
  );
}

export default App;
