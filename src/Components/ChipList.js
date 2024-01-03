import React from 'react';
import { ADD_CHIP } from '../GraphQL/Mutations';
import { LOAD_FOLDERS } from '../GraphQL/Queries';
import { useMutation, useQuery } from '@apollo/client';

const ChipList = (props) => {
    const chips = props.chips;
    const id = props.id

    const [addChip, { error }] = useMutation(ADD_CHIP)
    const {loading, data, refetch} = useQuery(LOAD_FOLDERS)

    function handleAddCard(chip,id) {
        addChip({
            variables: {
                folder_id: parseInt(id),
                id: chip.id,
                name: chip.name,
            }
        }).then(response => {
            refetch();
        }).catch((error) => {
            console.error('Error adding card:', error);
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
                        <button value={chip} onClick={()=>handleAddCard(chip,id)}>Add</button>
                    </div>
                    
                </div>
            })}
        </div>
    );
}
 
export default ChipList;