import React from 'react';
import ReactDOM from 'react-dom';


const Menu = (props)=>{
    return ReactDOM.createPortal(
        <div className='menu'>
            <div className='player-names'>
               <form>
                   <label htmlFor='playerX'>Player X name</label>
                   <input type='text' id='playerX' name='playerX' placeholder='Enter name of player X' onChange={props.handleUpdatePlayerX} />
                   <label htmlFor='playerO'>Player O name</label>
                   <input type='text' id='playerO' name='playerO' placeholder='Enter name of player O' onChange={props.handleUpdatePlayerO} />
               </form>
           </div>
            <div className='change-theme'>
                <p> Switch theme</p>
                <button
                    onClick={props.switchTheme}
                    className={props.darkTheme?'theme-dark':'theme-light'}>

                </button>
            </div>
        </div>
        ,document.getElementById('menu')
    )
};

export default Menu;