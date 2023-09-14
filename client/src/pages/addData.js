import InsertCharacters from "../components/insertCharacter";
import Characterlists from "../components/charactersLists";

const AddData = () => {
    return(
        <div className="AddData">
            <Characterlists />
        <div style={{textAlign:"left"}}>
        <h3>Insert data to  Characters collection</h3>
       <InsertCharacters />
       </div>
       </div>
    )}

    export default AddData;
