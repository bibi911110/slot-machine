import React from 'react';


const Navbar = () => {
    
    return (
        <nav className='nav'>
            <div className='nav-center'>
                <div className='nav-header'>
                    <h3>Slot-Game</h3>
                </div>
            </div>
            <ul className='nav-links'>
                <li className='link-btn'>
                    Login
                </li>
                <li className='link-btn'>
                    Register
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;