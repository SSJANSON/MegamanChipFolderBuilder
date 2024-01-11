import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import GetChips from './Components/GetChips';
import GetFolder from './Components/GetFolder';
import { LOAD_CHIPS } from './GraphQL/Queries';
import { useQuery } from '@apollo/client';
import ChipDetails from './Components/ChipDetails';


const FolderCustomization = () => {
    const { id } = useParams()

    const {error, loading, data} = useQuery(LOAD_CHIPS)

    const [chips, setChips] = useState([])
    const [detail, setDetail] = useState({id:1, letter:"A"})
    
    useEffect(() => {
        if (data) {
            setChips(data.getAllChips)
        }
    }, [data])


    const handleChange = (chip) => {
        setDetail({id: chip.id, letter: chip.letter});
    };

    return (  
        
        <div className="folder-customization">
            <h2>Folder Customization - { id }</h2>
            <div className="customization">
                <div className="chips">
                    <h1>Your Folder</h1>
                        <GetFolder id={id} chips={chips} handleChange={handleChange}/>
                </div>
                <div className="chips">
                    <h1>Your Chips</h1>
                    <GetChips id={id} chips={chips} handleChange={handleChange}/>
                </div>
                <div className="chip-details" >
                    <ChipDetails id={id} chips={chips} detail={detail}/>
                </div>
            </div>
            
        </div>
    );
}
 
export default FolderCustomization;