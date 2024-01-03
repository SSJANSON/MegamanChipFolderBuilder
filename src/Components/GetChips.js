import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { LOAD_CHIPS } from '../GraphQL/Queries'
import ChipList from './ChipList'

function GetChips(props) {

    const id = props.id;

    const {error, loading, data} = useQuery(LOAD_CHIPS)


    const [chips, setChips] = useState([])
    useEffect(() => {
        if (data) {
            setChips(data.getAllChips)
        }
    }, [data])

    return (
        // <div>
        //     {chips.map((val)=>{
        //         return <h1>{val.id}</h1>
        //     })}
        // </div>

        <ChipList chips={chips} id={id} type={"builder-chips"}/>

        // <div className="chip-list">
        //     {chips.map((chip)=>{
        //         return(
        //             <div className='chip-list-chips'>
        //                 <ChipDetails chip={chip}/>
        //                 <div className='chip-list-button'>
        //                     <button value={chip} onClick={()=>handleAddCard(chip,id)}>Add</button>
        //                 </div> 
        //             </div>
        //         )
        //     })}
        // </div>
    );
}
 
export default GetChips;