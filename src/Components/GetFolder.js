import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { LOAD_FOLDERS } from '../GraphQL/Queries'
import ChipList from './ChipList'

function GetFolder(props) {

    const id = props.id;

    const {error, loading, data} = useQuery(LOAD_FOLDERS)
    const [folders, setFolders] = useState([])

    useEffect(() => {
        if (data) {
            console.log(id)
            setFolders(data.getAllFolders)
        }
    }, [data])
    return (
        <div>
            {folders.map((folder)=>{
                if (folder.id == id){
                    return <ChipList chips={folder.chips} id={id}/>
                }
            })}
        </div>       
    );
}
 
export default GetFolder;