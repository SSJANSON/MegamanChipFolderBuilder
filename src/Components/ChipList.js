import React, { useEffect } from 'react';
import { ADD_CHIP, DELETE_CHIP } from '../GraphQL/Mutations';
import { LOAD_FOLDERS } from '../GraphQL/Queries';
import { useMutation, useQuery } from '@apollo/client';

const ChipList = (props) => {
    const chips = props.chips;
    const id = props.id
    const type = props.type

    const [addChip, { error }] = useMutation(ADD_CHIP)
    const [deleteChip, {deleteError}] = useMutation(DELETE_CHIP)
    const {loading, data, refetch} = useQuery(LOAD_FOLDERS)


    function handleAddCard(folder_id,chip) {
        addChip({
            variables: {
                folder_id: parseInt(folder_id),
                chip_id: chip.chip_id,
                name: chip.name,
                letter: chip.letter,
                mb: chip.mb,
                category: chip.category
            }
        }).then(response => {
            refetch();
        }).catch((error) => {
            props.setOpen(true)
            props.setErrorMessage(error.message)


            console.error('Error adding card:', error);
        });
    } 

    function handleDeleteChip(folder_id, chip) {
        deleteChip({
            variables:{
                folder_id: parseInt(folder_id),
                chip_id: chip.chip_id,
                id: chip.id,
                name: chip.name
            }
        }).then(response => {
            refetch();
        }).catch((deleteError) => {
            console.error('Error deleting card:', deleteError);
        });
    }

    return ( 
        <div style={{height: "425px", overflowY: "scroll", flexDirection: "column-reverse", overflowAnchor: "auto"}}>
            <div className="chip-list">
            {chips.map((chip)=>{
                // console.log(chip.category)
                // console.log(chip.chip_id)
                // console.log(chip.ver)
                return <div className='chip-list-chips' onClick={() => props.handleChange({name: chip.name, letter: chip.letter})}>
                    <img src={`/Images/MMBN6/${chip.category}${chip.chip_id}${chip.ver}.webp`} alt="image"/>
                    <h2 className="chip-list-name">{ chip.name } </h2>
                    <div className='chip-list-info'> 
                        
                        <img className='chip-list-type' src={`/Images/Type/${chip.type}.webp`} alt="image"/>
                        <h2 className="chip-list-letter">{ chip.letter }</h2>
                        <p className="chip-list-letter">{ chip.mb }</p>
                        
                    </div>
                    <div className='chip-list-button'>
                        {type==="builder-chips" && <button value={chip} onClick={()=>handleAddCard(id,chip)}>+</button>}
                        {type==="folder-chips" && <button value={chip} onClick={()=>handleDeleteChip(id,chip)}>-</button>}
                    </div>
                    
                </div>
        })}
    </div>

        </div>
        
    
    );
}
 
export default ChipList;