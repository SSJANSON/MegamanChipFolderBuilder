import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { LOAD_CHIPS } from '../GraphQL/Queries'
import ChipList from './ChipList'

function GetChips(props) {

    const id = props.id;

    const {error, loading, data} = useQuery(LOAD_CHIPS)
    const [chips, setChips] = useState([])
    useEffect(() => {
        if (data) {
            setChips(data.getAllChips)
        }
    }, [data])

    return (
        // <div>
        //     {chips.map((val)=>{
        //         return <h1>{val.id}</h1>
        //     })}
        // </div>
        <ChipList chips={chips} id={id}/>
    );
}
 
export default GetChips;