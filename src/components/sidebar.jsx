import React from 'react';
import {Material, Layout, MathOps, Code, Export} from './../components/docks';

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
                <h4>Export</h4>
                <Export />
            </div>
            {/* <div className='settings-element'>
                <h4>Code</h4>
                <Code />
            </div> */}
          </div>
        </div>
    )
}

export default Sidebar;