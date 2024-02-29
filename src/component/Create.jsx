import React, { useState, useContext } from 'react';
import { AppContext } from './Context';
import { useNavigate } from 'react-router-dom';



const Create = () => {
  const  {addUser3 , state}  = useContext(AppContext);
  const initialState = {
    Name: "",
    Title: "",
    Description: "",
    Date: "", // Add the Date property
    like:"",
    comment:[],
   
  };
  console.log(addUser3);
  const [addUser2 , setAddUser] = useState(initialState);
  const navigate = useNavigate();

  const { Name, Title, Description,Date } = addUser2;

  const handleAdd = () => {
    if (!Name || !Title || !Description ) {
      return alert("All fields are required");
    }
    else{
      addUser3(addUser2)
      navigate('/');
    }
   
  };


  const collectInfo = (e) => {
    setAddUser({
      ...addUser2,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="text-center">
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
         
          <div className="p-2 w-1/2">
  <div className="relative">
    <label htmlFor="Name" className="leading-7 text-xl text-green-600">Name</label>
    <input
      type="text"
      id="Name"
      name="Name" 
      value={Name}
      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      onChange={collectInfo}
    />
  </div>
</div>
<div className="p-2 w-1/2">
  <div className="relative">
    <label htmlFor="Title" className="leading-7 text-xl text-green-600">Blog-Title</label>
    <input
      type="text"
      id="Title"
      name="Title" // Use "Title" to match the state
      value={Title}
      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      onChange={collectInfo}
    />
  </div>
</div>
<div className="p-2 w-1/2">
      <div className="relative">
        <label htmlFor="Date" className="leading-7 text-xl text-green-600">Date</label>
        <input
          type="date"
          id="Date"
          name="Date"
          value={Date}
          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          onChange={collectInfo}
        />
      </div>
    </div>
<div className="p-2 w-full">
  <div className="relative">
    <label htmlFor="Description" className="leading-7 text-2xl text-green-600">Blog Story:</label>
    <textarea
      id="Description"
      name="Description" // Use "Description" to match the state
      value={Description}
      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-green-400 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
      onChange={collectInfo}
    />
  </div>
</div>

          <div className="p-2 w-full">
            <button className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:shadow-lg md:shadow-xl md:shadow-green-300 rounded text-lg" onClick={handleAdd}>Button</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Create;
