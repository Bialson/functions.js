import React,  {useState} from 'react';
import icon from './../img/icons/logo256.png';
import {motion} from 'framer-motion';
import ExampleFormula from './exampleFormula';


const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const [style, setStyle] = useState('dark');
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
          <div className='template_functions'>
            <ExampleFormula formula="\cfrac{a}{b} =" tex=" \cfrac{a}{b}"/>
            <ExampleFormula formula="\cfrac{a}{\cfrac{1}{b}} =" tex=" \cfrac{a}{1 + \cfrac{1}{b}}"/>
            <ExampleFormula formula="x^n =" tex=" x^n"/>
            <ExampleFormula formula="e^{x + y} =" tex=" e^{x + y}"/>
            <ExampleFormula formula="\sqrt{x} =" tex=" \sqrt{x}"/>
            <ExampleFormula formula="\sqrt[3]{x} =" tex=" \sqrt[3]{x}"/>
            <ExampleFormula formula="\int{f(x)dx} =" tex=" \int{f(x)dx"/>
            {/* <motion.li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='item' onClick={showSettingsBox} title='Settings'>
                <motion.span animate={{rotateZ: isHovered ? '360deg' : '0deg'}} transition={{duration: 1}} className='icon'>
                  <i className="bi bi-gear-wide-connected"></i>
                </motion.span>
                <span className='text'>Settings</span>
            </motion.li> */}
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
          </div>
      </nav>
    );
}

export default Navbar;