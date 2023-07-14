import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      //.then((data) => setMessage(data.message));
      .then((res) => {
        //console.log(res.data)
         const fdata = res.data.map((dt,i)=>{
           
              
                
             return dt.collectionName;
                
            
        })
        //setMessage(res.data+',')
         console.log("check",fdata);
        setMessage(fdata);
       // message = ['test','test1']
      })
  }, []);
  return (
    <div className="App">
     {  <header className="App-header">
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
              <h5>Display db list in loop</h5>
          <ul>
      
           <li>{message}</li>
        </ul>
   
      </header>
     
      }

    </div>
  );
}

export default App;
