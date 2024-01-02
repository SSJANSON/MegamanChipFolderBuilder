import { useState } from "react";
import GetChips from "./Components/GetChips";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_FOLDER } from "./GraphQL/Mutations";


const CreateFolder = () => {

    const [name, setName] = useState()
    const history = useHistory()
    const [createFolder, {error}] = useMutation(CREATE_FOLDER)

    function handleCreateFolder(name) {
        createFolder({
            variables: {
                name: name,
            }
        }).then(response => {
            const id = response.data.createFolder.id
            console.log(id)
            history.push(`/folders/${id}`)
        }).catch((error) => {
            console.error('Error adding card:', error);
        });
    } 

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreateFolder(name)
        
    }

    return (
        <div className="CreateFolder">
            <h2>Create a new chip folder</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="string"
                    required
                    value = { name }
                    onChange={(e) => setName(e.target.value)}
                />
                <h2>{name}</h2>
                <button type="submit">Start</button>
            </form>
        </div>
    );
}
 
export default CreateFolder;