import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { LOAD_FOLDERS } from '../GraphQL/Queries'
import ChipList from './ChipList'

function GetFolder(props) {

    const id = props.id;
    const chips = props.chips;

    const {error, loading, data} = useQuery(LOAD_FOLDERS)
    const [folders, setFolders] = useState([])

    useEffect(() => {
        if (data) {
            setFolders(data.getAllFolders)
        }
    }, [data])

    return (
        <div>
            {folders.map((folder)=>{
                if (folder.id === id){
                    console.log(folder)
                    const chipList = []
                    folder.chips.map((folder_chip)=>{
                        const current = chips.find(chip => chip.id === folder_chip.id)
                        console.log(current)
                        chipList.push(current)
                    })
                    console.log(chipList)
                    return <ChipList chips={folder.chips} id={id} type={"folder-chips"}/>
                }
            })}
        </div>       
    );
}
 
export default GetFolder;