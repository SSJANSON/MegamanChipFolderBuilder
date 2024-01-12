import { useEffect, useState } from 'react'
import image from './chip.png'

const ChipDetails = (props) => {
    const chips = props.chips
    const detail = props.detail  
    const [currentChip, setCurr] = useState({"chip_id":1,"name":"Cannon","type":"Null","damage":40,"description":"Cannon attack to 1 enemy","letter":"A","category":"S","mb":6,"location":"Folder1 x2"})
    useEffect(() => {
        async function getCurrentChip() {
            const newChip = await chips.find(chip => ((chip.chip_id === detail.id) && (chip.letter === detail.letter)))
            setCurr(newChip)
          }
          getCurrentChip()
    }, [detail]);

    return (
        <div>
            <div className='chip-info-title'>
                {currentChip && <h1>{currentChip.name}</h1>}
            </div>
            
            <div className="chip-info" style={{ backgroundImage:`url(${image})`, backgroundRepeat:"no-repeat"}}>
                {currentChip && <div>
                    <img className="chip-info-pic" src={`/Images/MMBN6/${currentChip.category}${currentChip.chip_id}.webp`} alt="image"></img>
                    <div className='chip-info-1'>
                        <h2 className='chip-info-1-letter'>{ currentChip.letter }</h2>
                        <img src={`/Images/Type/${currentChip.type}.webp`} alt="image"></img>
                        <div className='chip-info-1-damage'>
                            <h2>{ currentChip.damage }</h2>
                        </div>
                    </div>
                    <div className='chip-info-2'>
                        <h2>{ currentChip.description }</h2>
                        <h2 style={{marginTop: "10px", fontSize: 14}}>Location: { currentChip.location }</h2>
                    </div>
                </div>}
            </div>
        </div>
    
    
        
        
    );
}

export default ChipDetails;