import React, { useState } from "react";

const InsertCharacters = () => {
    const [name, setCName] = useState('')
   // const [error,setError] = useState(null)
    const handleSubmit = async(e) => {
      e.preventDefault();
      
        const characters ={name};
        
        fetch('http://localhost:8000/api/insertCharacters',{
          method: 'POST',
          body: JSON.stringify(characters),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((res) => res.json())
        .then((post) =>{
          setCName('');
          console.log('Data inserted successfully',post);
        })
        .catch((err) => {
           console.log(err.message)
        })
  
        /*const response = await fetch('http://localhost:8000/api/insertCharacters',{
          method: 'POST',
          body: JSON.stringify(characters),
          headers: {
            'Content-Type': 'application/json',
          }
        });
          const json = await response.json();
        if (response.ok) {
          setCName('')
          console.log('Data inserted successfully',json);
          // Clear form or perform other actions as needed
        } else {
          //setError(json.error)
          console.error('Error inserting data');
        }*/
     
    };
  
    /*const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };*/
  
    return (
     
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setCName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
     
    );
  }

  export default InsertCharacters;