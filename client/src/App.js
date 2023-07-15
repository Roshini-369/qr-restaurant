import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

function RenderingArrayOfObjects(){
  const data = [
    {
      "State" : "Uttar Pradesh",
      "Capital" : "Lucknow"
    },
    {
      "State" : "Gujarat",
      "Capital" : "Gandhinagar"
    }
  ]
  const listItems = data.map(
    (ele) => {
      return (
        <ul type="disc">
           <li style={{
               fontWeight:'bold',
               color:'red'
           }}>
            {ele.State}
           </li>
           {ele.Capital}
        </ul>
      )
    }
  )
  return(
    <div>
      {listItems}
    </div>
  )
}

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

const DbData = () => {
  const [message, setMessage] = useState(null);

   useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      //.then((data) => setMessage(data.message));
      .then((res) => {
        console.log(res.data)
        setMessage(res.data)
      })
  }, []); 
  return(
    <>
    {message && message.map((i) =>{
      return (
      <ul>
      <li>{i.collectionName}</li>
      </ul>
      )
    })}
    </>
  )
} 

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
    <div className="App">
     {/*  { <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
         <h3>Rendering Array of Objects</h3>
        <br></br>
        <RenderingArrayOfObjects /> 
        <h3>{message}</h3>
      </header>
      
      }  */}
     <div style={{textAlign:"left"}}> 
      <h1 style={{color:'green'}}>GeeksforGeeks</h1>
      <h3>Rendering Array of Objects</h3>
      <RenderingArrayOfObjects />
     </div> 
     <div style={{textAlign:"left"}}>
      <h3>Data received from Collection</h3>
     <DbData />
     </div>
    </div>
  );
}

export default App;
