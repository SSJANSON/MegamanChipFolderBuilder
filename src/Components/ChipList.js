import React from 'react';
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
                id: chip.id,
                name: chip.name,
            }
        }).then(response => {
            refetch();
        }).catch((error) => {
            console.error('Error adding card:', error);
        });
    } 

    function handleDeleteChip(folder_id, chip) {
        deleteChip({
            variables:{
                folder_id: parseInt(folder_id),
                chip_id: chip.id
            }
        }).then(response => {
            refetch();
        }).catch((deleteError) => {
            console.error('Error deleting card:', deleteError);
        });
    }

    return (  
        <div className="chip-list">
            {chips.map((chip)=>{
                return <div className='chip-list-chips'>
                    <div className='chip-list-info'>
                        <h1>{ chip.name }</h1>
                        <p>{ chip.id }</p>
                        <img src={ chip.image }></img>
                    </div>
                    <div className='chip-list-button'>
                        {type=="builder-chips" && <button value={chip} onClick={()=>handleAddCard(id,chip)}>Add</button>}
                        {type=="folder-chips" && <button value={chip} onClick={()=>handleDeleteChip(id,chip)}>delete</button>}
                    </div>
                    
                </div>
            })}
        </div>
    );
}
 
export default ChipList;