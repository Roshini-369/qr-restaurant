const RenderingArrayOfObjects = () =>{
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

  export default RenderingArrayOfObjects;