
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addPost } from '../postsSlice';
import toast from 'react-hot-toast';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSavePostClicked = () => {
    if (title && body) {
      dispatch(addPost({ title, body }));
      setTitle('');
      setBody('');
      navigate('/');
      toast.success('New post added!');
    }
  };

  return (
    <section className="p-4">
      <h2 className="mb-4 text-xl font-bold">Add a New Post</h2>
      <form>
        <label className="block mb-2" htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          className="w-full p-2 mb-4 border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="block mb-2" htmlFor="postBody">Content:</label>
        <textarea
          id="postBody"
          name="postBody"
          className="w-full p-2 mb-4 border"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          className="p-2 text-white bg-blue-500"
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
