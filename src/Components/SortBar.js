import { useState } from "react"

const SortBar = (props) => {
    const type_filters = ["Standard", "Mega", "Giga"]
    
    const order_filters = ['In Order', 'Reverse Order', 'Recently Added']
    const select = ["Your Folder", "Chip Pack"]

    

    return (  
        <div>
            <h2>Pack Sort</h2>
            <div className="letter-sort">
                {props.letter_filters.map((letter,index) => {
                    return(
                        <div style={{margin: "3px"}}>
                            <input
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                name={letter}
                                value={letter}
                                checked={props.checkedStateLetter[index]}
                                onChange={() => props.handleLetterChange(index)}
                            />{letter}
                        </div>
                    )
                })}
                
            </div>
        </div>
        
    );
}
 
export default SortBar;