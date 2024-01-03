import React from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import GetChips from './Components/GetChips';
import GetFolder from './Components/GetFolder';

const FolderCustomization = () => {
    const { id } = useParams()
    console.log(id)


    return (  
        
        <div className="folder-customization">
            <h2>Folder Customization - { id }</h2>
            <div className="customization">
                <div className="chips">
                    <h1>Your Folder</h1>
                        <GetFolder id={id}/>
                </div>
                <div className="chips">
                    <h1>Your Chips</h1>
                    <GetChips id={id} />
                </div>
            </div>
            
        </div>
    );
}
 
export default FolderCustomization;