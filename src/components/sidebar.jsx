import React,  {useState} from 'react';
import {Colors, Layout, Math, Code, Export} from './../components/docks';
import {motion} from 'framer-motion';

const docks = {
    'Colors': Colors,
    'Layout': Layout,
    'Math': Math,
    'Code': Code,
    'Export': Export
  }
  
  const switchDock = (tag) => {
    const TagName = docks[tag];
    return <TagName />
  }

const Sidebar = () => {
    const [dockSelected, setDock] = useState('Colors');
    const changeDock = (title) => {
      setDock(title);
    }
    return(
        <div className='sidebar'>
          {/* <motion.div className='plot-settings'>
            <div className='settings-dock'>
              {switchDock(dockSelected)}
            </div>
            <hr></hr>
            <ul>
              <li className='dock-item' title='Colors' id='colors' onClick={() => changeDock('Colors')}>
                <i className="bi bi-palette-fill"></i>
              </li>
              <li className='dock-item' title='Layout' id='layout' onClick={() => changeDock('Layout')}>
                <i className="bi bi-grid-1x2-fill"></i>
              </li>
              <li className='dock-item' title='Math' id='math' onClick={() => changeDock('Math')}>
                <i className="bi bi-plus-slash-minus"></i>
              </li>
              <li className='dock-item' title='Code' id='code' onClick={() => changeDock('Code')}>
                <i className="bi bi-code-slash"></i>
              </li>
              <li className='dock-item' title='Export as image' id='export_img' onClick={() => changeDock('Export')}>
                <i className="bi bi-image-fill"></i>
              </li>
            </ul>
          </motion.div>
        <div className='code-container'>
          <Code />
        </div> */}
        </div>
    )
}

export default Sidebar;