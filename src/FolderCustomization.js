import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import GetChips from './Components/GetChips';
import GetFolder from './Components/GetFolder';
import { LOAD_CHIPS } from './GraphQL/Queries';
import { useQuery } from '@apollo/client';

const FolderCustomization = () => {
    const { id } = useParams()
    console.log(id)

    const {error, loading, data} = useQuery(LOAD_CHIPS)

    const [chips, setChips] = useState([])
    useEffect(() => {
        if (data) {
            setChips(data.getAllChips)
        }
    }, [data])

    return (  
        
        <div className="folder-customization">
            <h2>Folder Customization - { id }</h2>
            <div className="customization">
                <div className="chips">
                    <h1>Your Folder</h1>
                        <GetFolder id={id} chips={chips}/>
                </div>
                <div className="chips">
                    <h1>Your Chips</h1>
                    <GetChips id={id} chips={chips}/>
                </div>
            </div>
            
        </div>
    );
}
 
export default FolderCustomization;