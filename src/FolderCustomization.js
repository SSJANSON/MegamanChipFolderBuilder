import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import GetChips from './Components/GetChips';
import GetFolder from './Components/GetFolder';
import { LOAD_CHIPS } from './GraphQL/Queries';
import { useQuery } from '@apollo/client';
import ChipDetails from './Components/ChipDetails';
import {Popup} from 'reactjs-popup';
import SortBar from './Components/SortBar';

const FolderCustomization = () => {
    const { id } = useParams()

    const {error, loading, data} = useQuery(LOAD_CHIPS)

    const [chips, setChips] = useState([])
    const [sortedChips, setSortedChips] = useState([])
    const [detail, setDetail] = useState({name:"Cannon", letter:"A"})
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    
    useEffect(() => {
        if (data) {
            setChips(data.getAllChips)
            setSortedChips(data.getAllChips)
        }
    }, [data])


    const handleChange = (chip) => {
        setDetail({name: chip.name, letter: chip.letter});
    };

    const letter_filters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','*']
    const [checkedStateLetter, setCheckedStateLetter] = useState(
        new Array(letter_filters.length).fill(false)
    )
    const handleLetterChange = (position) => {
        const updatedCheckedState = checkedStateLetter.map((item, index) =>
          index === position ? !item : item
        )
        setCheckedStateLetter(updatedCheckedState)
    }

    useEffect(() => {
        if (checkedStateLetter.every(v => v === false)){
            setSortedChips(chips)
        }else{
            const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97
            const temp = []
            chips.map((chip) => {
                if (((chip.letter === '*') && (checkedStateLetter[26]===true)) || (checkedStateLetter[alphaVal(chip.letter)] === true)) {
                    temp.push(chip) 
                }
                
            })
            setSortedChips(temp)
        }
        

    }, [checkedStateLetter])

    return (  
        
        <div className="folder-customization">
            
            <h2>Folder Customization - { id }</h2>
            <SortBar letter_filters={letter_filters} checkedStateLetter={checkedStateLetter} handleLetterChange={handleLetterChange}/>
            <div className="customization">
                <div className="chips">
                    <h1>Your Chips</h1>
                        <GetFolder id={id} chips={chips} handleChange={handleChange} setErrorMessage={setErrorMessage}/>
                </div>
                <div className="chips">
                    <h1>Pack</h1>
                    <GetChips id={id} chips={sortedChips} handleChange={handleChange} setOpen={setOpen} setErrorMessage={setErrorMessage}/>
                </div>
                <div className="chip-details" >
                    <ChipDetails id={id} chips={chips} detail={detail}/>
                </div>
            </div>
            <Popup open={open} modal>
            {() => ( 
              <div className='error-popup'>
                <h1>Error</h1>
                <h2>{ errorMessage }</h2>
                <div className='error-popup-button'>
                    <button onClick={() => setOpen(false)}>
                    close
                    </button>
                </div>
                
              </div>
            )}
          </Popup>
            
        </div>
    );
}
 
export default FolderCustomization;