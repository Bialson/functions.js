import React,  {useState} from 'react';
import {Colors, Layout, Math, Code, Export} from './../components/docks';
import {motion} from 'framer-motion';

const Sidebar = () => {
    return(
        <div className='sidebar'>
          <div className='plot-settings'>
            <div className='settings-element'>
                <Colors />
            </div>
            <hr></hr>
            <div className='settings-element'>

            </div>
            <hr></hr>
            <div className='settings-element'>

            </div>
            <hr></hr>
            <div className='settings-element'>

            </div>
            <hr></hr>
            <div className='settings-element'>

            </div>
          </div>
        {/* <div className='code-container'>
          <Code />
        </div> */}
        </div>
    )
}

export default Sidebar;