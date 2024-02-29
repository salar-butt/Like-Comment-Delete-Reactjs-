import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  blogs: [],
};

const AppContext = createContext();

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return { ...state, blogs: action.payload };
    case 'ADD_USER':
      return { ...state, blogs: [...state.blogs, action.payload] };
    case 'ADD_COMMENT':
      const updatedBlogs = state.blogs.map((blog) => {
        if (blog.id === action.payload.id) {
          return action.payload;
        } else {
          return blog;
        }
      });
      return { ...state, blogs: updatedBlogs };
      case 'INCREMENT_LIKES':
  const { id } = action.payload;
  const updatedBlogsLikes = state.blogs.map((blog) => {
    if (blog.id === id) {
      return { ...blog, Like: blog.Like + 1 };
    } else {
      return blog;
    }
  });
  return { ...state, blogs: updatedBlogsLikes };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const fetchAllBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:7001/blog');
      dispatch({ type: 'GET_BLOGS', payload: res.data });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const addUser3 = async (newUser) => {
    try {
      const res = await axios.post('http://localhost:7001/blog', newUser);
      dispatch({ type: 'ADD_USER', payload: res.data });
    } catch (error) {
      console.log(error, 'error');
    }
  };
  
    const addComment = async (e) => {
    try {
      const data = { ...e.ele, comment: [...e.ele.comment, e.comment] };
      const res = await axios.put(`http://localhost:7001/blog/${e.ele.id}`, data);
      dispatch({ type: 'ADD_COMMENT', payload: res.data });
    } catch (error) {
      console.log(error, 'Comment_error');
    }
  };
  const addlike = async (e) => {
    try {
      const data = { ...e.ele, Like: e.ele.Like + 1 };
      const res = await axios.put(`http://localhost:7001/blog/${e.ele.id}`, data);
      dispatch({ type: 'INCREMENT_LIKES', payload: res.data });
    } catch (error) {
      console.log(error, 'INCREMENT_LIKES_error');
    }
  };
  

  return (
    <AppContext.Provider value={{ state, dispatch, fetchAllBlogs, addUser3, addComment,addlike }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
