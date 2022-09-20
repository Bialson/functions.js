import React,  {useState} from 'react';
import icon from './../img/icons/logo256.png';
import {motion} from 'framer-motion';
import ExampleFormula from './exampleFormula';


const Navbar = () => {
    const [showSettings, setSettingsDisplay] = useState(false);
    const [isSettingsHover, setSettingsHover] = useState(false);
    return(
      <nav className='navbar'>
          <p className='logoNav'><img src={icon} alt='icon' width={200} height={110} style={{border: 'none'}}/>&nbsp;<br></br>Functions.JS</p>
          <hr></hr>
          {/* <div className='template_functions'>
            <ExampleFormula formula="\cfrac{a}{b} =" tex=" \cfrac{a}{b}"/>
            <ExampleFormula formula="\cfrac{a}{\cfrac{1}{b}} =" tex=" \cfrac{a}{1 + \cfrac{1}{b}}"/>
            <ExampleFormula formula="x^n =" tex=" x^n"/>
            <ExampleFormula formula="e^{x + y} =" tex=" e^{x + y}"/>
            <ExampleFormula formula="\sqrt{x} =" tex=" \sqrt{x}"/>
            <ExampleFormula formula="\sqrt[3]{x} =" tex=" \sqrt[3]{x}"/>
            <ExampleFormula formula="\int{f(x)dx} =" tex=" \int{f(x)dx"/>
          </div> */}
          <motion.div className='settings-button' 
            onClick={() => {setSettingsDisplay(current => !current)}} 
            onMouseEnter={() => setSettingsHover(true)} 
            onMouseLeave={() => setSettingsHover(false)}>
            <motion.i className="bi bi-gear-wide-connected" transition={{duration: 0.8}}
              animate={{
                rotateZ: isSettingsHover ? '360deg' : '0deg', 
                color: isSettingsHover ? '#60CDFF' : '#ffffff'
            }}></motion.i>
            <span>Settings</span>
          </motion.div>
          <motion.div className='settings-box' animate={{height: showSettings ? 'auto' : '0'}} transition={{duration: 0.5, type: "spring"}}>
              <p>
                Dark Mode
                <input type='checkbox' className='checkbox-settings' defaultChecked={true}/>
              </p>
              <p>v.0.5.0</p>
          </motion.div>
      </nav>
    );
}

export default Navbar;