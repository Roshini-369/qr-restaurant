import React, { useState, useEffect } from "react";
const DbData = () => {
    const [message, setMessage] = useState(null);
  
     useEffect(() => {
      fetch("http://localhost:8000/api/getDbLists")
        .then((res) => res.json())
        .then((res) => {
          setMessage(res)
        })
    }, []);
    return(
      <>
      <h3>Message for Database : {message && message.message}</h3>
      {message && message.data.map((i) =>{
        return (
        <ul>
        <li>{i}</li>
        </ul>
        )
      })}
      </>
    )
  }

  export default DbData;