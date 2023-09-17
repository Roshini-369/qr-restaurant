//import React, { useState, useEffect } from "react";
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
//import Blogs from "./pages/Blogs";
//import Contact from "./pages/Contact";
//import NoPage from "./pages/NoPage";
import './App.css';
import AddData from "./pages/addData";
import Services from "./pages/services";
import { library } from '@fortawesome/fontawesome-svg-core'

// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

 /* function getdbList(){
  return fetch("http://localhost:8000/message")
  .then((res) => res.json())
}

function GetData(){
  const [message, setMessage] = useState("");
  useEffect(() => {
    getdbList().then((res) => {setMessage(res.data)});
  })
  return(
    <h3>{message}</h3>
  )
}  */

function App() {
 /*  const [message, setMessage] = useState("");

   useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      //.then((data) => setMessage(data.message));
      .then((res) => {
        console.log(res.data)
        setMessage(res.data)
      })
  }, []);  */
  return (
    <BrowserRouter>
    <Layout/>
    <Routes>
     {/*  <Route path="/" element={<Layout />}> */}
        <Route path="/" element={<Home />} />
        <Route path="addData" element={<AddData />} />
        <Route path="services" element={<Services />} />
      {/* </Route> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
library.add(fab, fas, far)