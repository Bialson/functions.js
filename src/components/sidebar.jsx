import React from 'react';
import {Material, Layout, MathOps, Code, Export} from './../components/docks';
// import {motion} from 'framer-motion';

const Sidebar = () => {
    return(
        <div className='sidebar'>
          <div className='plot-settings'>
            <div className='settings-element'>
                <h4>Material</h4>
                <Material />
            </div>
            <div className='settings-element'>
                <h4>Math</h4>
                <MathOps />
            </div>
            <div className='settings-element'>
                <h4>Layout</h4>
                <Layout />
            </div>
            <div className='settings-element'>

            </div>
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