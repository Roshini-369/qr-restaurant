import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const highlight = {
  border:'none',
  backgroundColor:'red',
  color:'yellow'
}
const Characterlists = () => {
    const [message, setMessage] = useState();
    const [delmsg, deleteMessage] = useState();
    const handleDelete = async(id) => {
      console.log("deleted id",id,delmsg)
      // perform delete operation using the id
      await fetch(`/api/deleteCharacters/${id}`, {
        method: "DELETE",
       // body: JSON.stringify(delmsg),
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((res) => res.json())
      .then((res) => {
        deleteMessage(res)
        console.log("deleted data",res)
      })
    
    }
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
      <h2>{message && message.message}</h2>
      {message && message.data.map((i) =>{
        return (
      <div class="listCharacters">
       <div class="card">
        <div class="card-body" style={{ color: '#6d3879', padding:'10px' }} key={i._id}>{i.name}
       
        <button class="btn btn-danger" onClick={() => handleDelete(i._id)} style={{float:"right",border:"none"}}><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
        </div>
       </div> 
       <br></br>
       </div>
        )
      })}
      
      </>
    )
  }

  export default Characterlists;