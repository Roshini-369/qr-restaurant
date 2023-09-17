import InsertCharacters from "../components/insertCharacter";
import Characterlists from "../components/charactersLists";

const AddData = () => {
    return(
        <div className="AddData">
        <div class="container">
            <div class="row align-items-start">
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <Characterlists />
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div style={{textAlign:"left"}}>
                <h3>Add any character name</h3><br></br>
       <InsertCharacters />
       </div>
                </div>
            </div>
        </div>
       
       
       </div>
    )}

    export default AddData;