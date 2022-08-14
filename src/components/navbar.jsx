import React,  {useState} from 'react';
import icon from './../img/icons/logo256.png';
import {motion} from 'framer-motion';

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [style, setStyle] = useState('dark');
    const showSettingsBox = () => {
      setIsActive(true);
    }
    const closeSettingsBox = () => {
      setIsActive(false);
    }
    const changeStyle = () => {
      setStyle((style === 'dark') ? 'light' : 'dark');
      console.log(style);
    }
    const navClasses = `navbar ${style}`;
    const themeIcon = `bi ${(style === 'dark') ? 'bi-moon-fill' : 'bi-brightness-high-fill'}`;
    return(
      <nav className={navClasses}>
          <p className='logoNav'><img src={icon} alt='icon' width={200} height={110} style={{border: 'none'}}/>&nbsp;<br></br>Functions.JS</p>
          <hr></hr>
          <ul>
            <li className='item' title='Home'>
              <a href='index.html'>
                <span className='icon'>
                  <i className="bi bi-house-fill"></i>
                </span>
                <span className='text'>Home</span>
              </a>
            </li>
            <li className='item' title='Charts'>
              <a href='index.html'>
                <span className='icon'>
                  <i className="bi bi-graph-up"></i>
                </span>
                <span className='text'>Charts</span>
              </a>
            </li>
            <li className='item' title='Docs'>
              <a href='index.html'>
                <span className='icon'>
                  <i className="bi bi-journal-code"></i>
                </span>
                <span className='text'>Docs</span>
              </a>
            </li>
            <li className='item' title='About'>
              <a href='index.html'>
                <span className='icon'>
                  <i className="bi bi-people-fill"></i>
                </span>
                <span className='text'>About</span>
              </a>
            </li>
            <motion.li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='item' onClick={showSettingsBox} title='Settings'>
                <motion.span animate={{rotateZ: isHovered ? '360deg' : '0deg'}} transition={{duration: 1}} className='icon'>
                  <i className="bi bi-gear-wide-connected"></i>
                </motion.span>
                <span className='text'>Settings</span>
            </motion.li>
            <div className='settings-box' style={{
              animation: isActive ? 'showSettingsBox 0.5s forwards' : 'hideSettingsBox 0.5s forwards'
            }}>
              <i className="bi bi-x-lg closeSettings" title='Close' onClick={closeSettingsBox}></i>
              <p>
                <motion.span className='themeBox' title='Change style' onClick={changeStyle}>
                  <motion.span className='themeCircle' animate={{left: (style === 'dark') ? '0px' : '20px'}}>
                     <i className={themeIcon} style={{color: 'black'}}></i>
                  </motion.span>
                </motion.span>
                Theme
              </p>
              {/* <p style={{fontWeight: '600'}}>Functions.JS: v0.0.1
                  React: v{React.version}
              </p>
              <p style={{fontWeight: '300'}}>Copyright &copy; 2022 Bartłomiej Białek</p> */}
            </div>
          </ul>
      </nav>
    );
}

export default Navbar;