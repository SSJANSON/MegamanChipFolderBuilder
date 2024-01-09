import image from './chip.png'

const ChipDetails = (props) => {
    const chips = props.chips
    const state = props.state

    return (
        <div className="chip-info" style={{ backgroundImage:`url(${image})`, backgroundRepeat:"no-repeat"}}>
            <img className="chip-info-pic" src={`/Images/MMBN6/S1.png`} alt="image"></img>
            <div className='chip-info-1'>
                <h2 className='chip-info-1-letter'>A</h2>
                <img src={`/Images/Type/Null.webp`} alt="image"></img>
                <div className='chip-info-1-damage'>
                    <h2 >40</h2>
                </div>
            </div>
            <div className='chip-info-2'>
                <h2 >Cannon attack to 1 enemy</h2>
                <h2 style={{marginTop: "10px", fontSize: 20}}>Location: Folder1 x2</h2>
            </div>
            
            
        </div>
    );
}

export default ChipDetails;