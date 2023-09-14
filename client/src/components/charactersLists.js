import React, { useState, useEffect } from "react";

const Characterlists = () => {
    const [message, setMessage] = useState();
    
     useEffect(() => {
       fetch("/api/getCharacters")
        .then((res) => res.json())
        .then((res) => {
          //console.log("res",res)
          setMessage(res)
        })
    }, [message]);
    return(
      <>
      <h3>Message from Characters : {message && message.message}</h3>
      {message && message.data.map((i) =>{
        return (
        <ul>
        <li key={i._id}>{i.name}</li>
        </ul>
        )
      })}
      </>
    )
  }

  export default Characterlists;
