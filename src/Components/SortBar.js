import { useState } from "react"

const SortBar = (props) => {

    return (  
        <div>
            <h2>Pack Sort</h2>
            <div className="letter-sort" onChange={props.onChangeOrder}>
                {props.filters[0].map((order,index) => {
                    return(
                        <div style={{margin: "7px"}}>
                            <input
                                type="radio"
                                id={`custom-checkbox-${index}`}
                                name={order}
                                value={order}
                                checked={props.checkedState[0] === order}
                                readOnly
                            />{order}
                        </div>
                    )
                })}  
            </div>
            <div className="letter-sort">
                {props.filters[1].map((letter,index) => {
                    return(
                        <div style={{margin: "3px"}}>
                            <input
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                name={letter}
                                value={letter}
                                checked={props.checkedState[1][index]}
                                onChange={() => props.handleLetterChange(index)}
                            />{letter}
                        </div>
                    )
                })}  
            </div>
            <div className="category-sort">
                {props.filters[2].map((category,index) => {
                    return(
                        <div style={{margin: "3px"}}>
                            <input
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                name={category}
                                value={category}
                                checked={props.checkedState[1][index]}
                                onChange={() => props.handleCategoryChange(index)}
                            />{category}
                        </div>
                    )
                })}
            </div>
        </div>
        
    );
}
 
export default SortBar;