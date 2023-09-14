import React, { useState, useEffect } from "react";



const Characterlists = () => {
    const [message, setMessage] = useState();
    
     useEffect(() => {
       fetch("/api/getCharacters")
        .then((res) => res.json())
        .then((res) => {
          console.log("res",res)
          setMessage(res)
        })
    }, [message]);
    return(
      <>
     <div class="card" style={{ width: '250px' }}>
      <div class="card-header">
      Message from Characters : {message && message.message}
  </div>
      <div class="card-body" style={{width:'250px'}}>
      {message && message.data.map((i) =>{
        return (
       
        
       

  <ul class="list-group list-group-flush">
   
        <li class="list-group-item" style={{ color: '#6d3879', borderBottom:'1px solid red' }} key={i._id}>{i.name}</li>
       
  </ul>
        
        )
      })}
      </div>
  </div>
      </>
    )
  }

  export default Characterlists;