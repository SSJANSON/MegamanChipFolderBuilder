import { useQuery } from "@apollo/client"
import { LOAD_FOLDERS } from "../GraphQL/Queries"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const GetAllFolders = () => {

    const {error, loading, data} = useQuery(LOAD_FOLDERS)
    const [folders, setFolders] = useState([])

    useEffect(() => {
        if (data) {
            setFolders(data.getAllFolders)
        }
    }, [data])

    return (  
        <div>
            {folders.map((folder) => {
                return <div>
                    <Link to={`/folders/${folder.id}`}>
                        <h2>{folder.name}</h2>
                    </Link>
                </div>
            })}
        </div>
    );
}
 
export default GetAllFolders;