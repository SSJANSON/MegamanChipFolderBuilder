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
                if (folder.id === parseInt(id)){
                    const chipList = []
                    folder.chips.map((folder_chip)=>{
                        const chipDetails = chips.find(chip => chip.chip_id === folder_chip.chip_id)
                        const currentId = {id: folder_chip.id}
                        const newChipDetails = {...chipDetails, ...currentId}
                        chipList.push(newChipDetails)
                    })
                    
                    return <ChipList chips={chipList} id={id} type={"folder-chips"}/>
                }
            })}
        </div>       
    );
}
 
export default GetFolder;