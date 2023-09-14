import InsertCharacters from "../components/insertCharacter";
import Characterlists from "../components/charactersLists";

const AddData = () => {
    return(
        <div className="AddData">
        <div class="container">
            <div class="row align-items-start">
                <div class="col-6">
                <Characterlists />
                </div>
                <div class="col-6">
                <div style={{textAlign:"left"}}>
        <h3>Add any character name</h3>
       <InsertCharacters />
       </div>
                </div>
            </div>
        </div>
       
       
       </div>
    )}

    export default AddData;