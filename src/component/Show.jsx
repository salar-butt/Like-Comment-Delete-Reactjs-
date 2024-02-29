import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { AppContext } from "./Context";

function Show() {
  const { state, dispatch, fetchAllBlogs, addComment,addlike } = useContext(AppContext);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const toggleComments = (id) => {
    setSelectedBlogId((prevId) => (prevId === id ? null : id));
  };

  const incrementLikes = async (id) => {
    try {
      // Update the server with the new Like count
      await addlike({ ele: state.blogs.find((blog) => blog.id === id), like: 1 });
    } catch (error) {
      console.error("Error incrementing likes:", error);
    }
  };
  
  

  const addCommentToBlog = async () => {
    if (selectedBlogId && comment.trim() !== "") {
      try {
        await addComment({ ele: state.blogs.find((blog) => blog.id === selectedBlogId), comment });
        setComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const deleteBlog = async (id) => {
    console.log('Deleting blog with ID:', id);
    try {
      await axios.delete(`http://localhost:7001/blog/${id}`);
      // Fetch all blogs after successfully deleting a blog
      await fetchAllBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  
  return (
    <div>
      <Header />
      <div className="view">
        <h1 style={{ textAlign: "center", width: "100%", fontSize: "40px" }}>
          Blog List
        </h1>
        <ul>
          {state.blogs.length > 0 ? (
            state.blogs.map((blog) => (
              <section key={blog.id} className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                  <div className="-my-8 divide-y-2 divide-gray-100">
                    <div className="py-8 flex flex-wrap md:flex-nowrap">
                      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                        <p>{blog.id}:</p>
                        <i className="fa-solid fa-user">
                          <span className="font-semibold title-font text-gray-700">{blog.Name}</span>
                        </i>
                        <span className="mt-1 text-gray-500 text-sm">
                          {new Date(blog.Date).toLocaleDateString()} 
                        </span>
                      </div>
                      <div className="md:flex-grow">
                        <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                          {blog.Title}
                        </h2>
                        <p className="leading-relaxed">{blog.Description}</p>
                        <div className="flex justify-end items-center gap-4 w-full text-lg">
                          <i className="fa-regular fa-heart hover:text-red-500" onClick={() => incrementLikes(blog.id)}>
                            <p className="text-sm -mt-8 bg-red-600 text-white text-center rounded mx-3 w-4">
                              {blog.Like}
                            </p>
                          </i>
                          <p onClick={() => toggleComments(blog.id)}>
                            Comment
                          </p>
                          <i className="fa-regular fa-comment hover:text-blue-500" onClick={() => toggleComments(blog.id)}>
                            <p className="text-sm -mt-8 bg-red-600 text-white text-center rounded mx-3 w-4">
                              {blog.comment?.length || 0}
                            </p>
                          </i>
                          <button onClick={() => deleteBlog(blog.id)} className="text-red-500 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                        <div className={`${selectedBlogId === blog.id ? `block` : `hidden`}`}>
                          <div className="w-full h-auto border text-center text-lg">
                            <input
                              type="text"
                              placeholder="Write Your Comment"
                              value={comment}
                              className="border w-96 h-8 outline-none rounded text-center focus:outline-blue-500"
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <i
                              className="fa-solid fa-paper-plane p-2 bg-blue-600 hover:bg-blue-400 text-white cursor-pointer"
                              onClick={addCommentToBlog}
                            ></i>
                            <div className={`${selectedBlogId === blog.id ? `block` : `hidden`}`}>
                              {blog.comment?.length > 0 ? (
                                blog.comment.map((e, i) => (
                                  <p key={i}>
                                    {i + 1}: {e}
                                  </p>
                                ))
                              ) : (
                                <p>no comments</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))
          ) : (
            <p>No data here</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Show;
