import React, { useEffect, useState } from 'react'
import ChipList from './ChipList'

function GetChips(props) {

    const id = props.id;
    const chips = props.chips;
    

    return (
        // <div>
        //     {chips.map((val)=>{
        //         return <h1>{val.id}</h1>
        //     })}
        // </div>

        <ChipList chips={chips} id={id} type={"builder-chips"} handleChange={props.handleChange} setOpen={props.setOpen} setErrorMessage={props.setErrorMessage}/>

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