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
                chip_id: chip.chip_id,
                name: chip.name,
                letter: chip.letter
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
                chip_id: chip.chip_id,
                id: chip.id
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
                    <img src={`/Images/MMBN6/${chip.category}${chip.chip_id}.png`} alt="image"></img>
                    <h2 className="chip-list-name">{ chip.name }</h2>
                    <div className='chip-list-info'> 
                        
                        <img className='chip-list-type' src={`/Images/Type/${chip.type}.webp`} alt="image"></img>
                        <h2 className="chip-list-letter">{ chip.letter }</h2>
                        
                    </div>
                    

                    {/* <div className='chip-list-info'>
                        <h2 className="chip-list-name">{ chip.name }</h2>
                        <img className='type' src={`/Images/Type/${chip.type}.webp`} alt="image"></img>
                        <h2 className="letter">{ chip.letter }</h2>
                    </div> */}
                    <div className='chip-list-button'>
                        {type=="builder-chips" && <button value={chip} onClick={()=>handleAddCard(id,chip)}>+</button>}
                        {type=="folder-chips" && <button value={chip} onClick={()=>handleDeleteChip(id,chip)}>-</button>}
                    </div>
                    
                </div>
            })}
        </div>
    );
}
 
export default ChipList;