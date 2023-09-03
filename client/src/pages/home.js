import RenderingArrayOfObjects from "../components/testArrays";
import DbData from "../components/dbData";
import Characterlists from "../components/charactersLists";

const Home = () => {
    return(
    <div className="App">   
    <div style={{textAlign:"left"}}> 
    <h1 style={{color:'green'}}>GeeksforGeeks</h1>
    <h3>Rendering Array of Objects</h3>
    <RenderingArrayOfObjects />
   </div> 
   <div style={{textAlign:"left"}}>
    <h3>Data received from Database Lists</h3>
   <DbData />
   </div>
   <div style={{textAlign:"left"}}>
    <h3>Data received from Character</h3>
   <Characterlists />
   </div>
   
   </div>
    )
  };
  
  export default Home;