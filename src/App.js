import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Create from './component/Create'
import Header from './component/Header'
import Show from './component/Show'


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={ <Show/>} />
      <Route path='/createBlog' element={ <Create/>} />
    </Routes>
        </>
       
  )
}

export default App
