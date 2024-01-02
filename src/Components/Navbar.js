import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Megaman Chip Folder Creator</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create-folder">New Folder</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;