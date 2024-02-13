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

    const filters = [['ID', 'ABCDE', 'Code', 'Attack', 'Element', 'MB'], ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','*'],["Standard", "Mega", "Giga"]]
    const [checkedStateOrder, setCheckedStateOrder] = useState('ID')
    const [checkedStateLetter, setCheckedStateLetter] = useState(
        new Array(filters[1].length).fill(false)
    )
    const [checkedStateCategory, setCheckedStateCategory] = useState(
        new Array(filters[2].length).fill(false)
    )
    
    function onChangeOrder(event){
        setCheckedStateOrder(event.target.value)
        console.log(event.target.value)
    }

    const handleLetterChange = (position) => {
        const updatedCheckedState = checkedStateLetter.map((item, index) =>
          index === position ? !item : item
        )
        setCheckedStateLetter(updatedCheckedState)
    }
    
    const handleCategoryChange = (position) => {
        const updatedCheckedState = checkedStateCategory.map((item, index) =>
          index === position ? !item : item
        )
        setCheckedStateCategory(updatedCheckedState)
    }

    
    useEffect(() => {
        var orderedChips = []
        var arrayForSort = [...chips]
        if (checkedStateOrder === "ID"){
            orderedChips = arrayForSort
        } else if (checkedStateOrder === "ABCDE"){
            orderedChips = arrayForSort.sort(function(a, b) {if (a.name < b.name) {return -1} if (a.name > b.name) {return 1} return 0}); 
        } else if (checkedStateOrder === "Code"){
            orderedChips = arrayForSort.sort(function(a, b) {if (a.letter < b.letter) {return -1} if (a.letter > b.letter) {return 1} return 0}); 
        } else if (checkedStateOrder === "Attack"){
            orderedChips = arrayForSort.sort((a, b) => b.damage-a.damage); 
        } else if (checkedStateOrder === "Element"){
            orderedChips = arrayForSort.sort(function(a, b) {if (a.type < b.type) {return -1} if (a.type > b.type) {return 1} return 0}); 
        } else if (checkedStateOrder === "MB"){
            orderedChips = arrayForSort.sort((a, b) => b.mb-a.mb); 
        }
        

        if (checkedStateLetter.every(v => v === false)){
            setSortedChips(orderedChips)
        }else{
            const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97
            const temp = []
            orderedChips.map((chip) => {
                if (((chip.letter === '*') && (checkedStateLetter[26]===true)) || (checkedStateLetter[alphaVal(chip.letter)] === true)) {
                    temp.push(chip) 
                }
                
            })
            setSortedChips(temp)
        }
        

    }, [checkedStateOrder,checkedStateLetter, checkedStateCategory])

    return (  
        
        <div className="folder-customization">
            
            <h2>Folder Customization - { id }</h2>
            <SortBar filters={filters} checkedState={[checkedStateOrder,checkedStateLetter,checkedStateCategory]} handleLetterChange={handleLetterChange} handleCategoryChange={handleCategoryChange} onChangeOrder={onChangeOrder}/>
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