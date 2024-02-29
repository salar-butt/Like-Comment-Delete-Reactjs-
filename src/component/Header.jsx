import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Create from './Create';
import Show from './Show';

function Header() {
  const navigate = useNavigate();

  const [pageshow , setShowpage] = React.useState(false)

  const handleclick = () => {
    navigate("/createBlog")
    setShowpage(!pageshow)
  }

  return (
    <header className="text-gray-600 bg-white body-font shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img
          className=' rounded-full'
            height={60}
            width={60}
            src="https://media.istockphoto.com/id/1320171541/photo/virtual-bitcoin-sketch-on-chinese-flag-and-blue-sky-background-double-exposure.webp?b=1&s=170667a&w=0&k=20&c=LQcgUXGkckI9aDCQ1yD2MQfws-50GprjU7AdeWGM6tU="
            alt=""
          />
          <span className="ml-3 text-xl">Create Blogs</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/">
            <a className="mr-5 hover:text-blue-700 cursor-pointer">Home</a>
          </Link>
          <Link to="/createBlog">
            <a className="mr-5 hover:text-green-300  cursor-pointer">If you want add your blog click on it-><span style={{color:"blue"}}>Blog</span></a>
          </Link>
        </nav>
        <button
          className="inline-flex items-center bg-green-400 text-white border-0 py-1 px-3 focus:outline-none hover:bg-green-800 active:scale-90 rounded text-base mt-4 md:mt-0 shadow shadow-lg shadow-red-500 md:shadow-xl hover:shadow-indigo-500/40"
          onClick={handleclick}
        >
          Create Blog
       
        </button>

          <div>
       
          </div>

      </div>
    </header>
  );
}

export default Header;
