import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPosts, selectFilteredPosts } from "../postsSlice";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePost(id)).unwrap();
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  let content;

  if (postStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postStatus === "succeeded") {
    content = posts.length > 0 ? (
      posts.map((post) => (
        <div
          key={post.id}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-md"
        >
          <h3 className="mb-2 text-xl font-bold">{post.title}</h3>
          <p className="text-gray-700">{post.body}</p>
          <button
            className="p-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => handleDelete(post.id)}
          >
            Delete
          </button>
        </div>
      ))
    ) : (
      <p>No posts found</p>
    );
  } else if (postStatus === "failed") {
    content = <p>Failed to load posts.</p>;
  }

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {content}
    </section>
  );
};

export default PostsList;
