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
    const themeIcon = `bi ${(style === 'dark') ? 'bi-moon-fill' : 'bi-brightness-high-fill'}`;
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
          <div className='settings-button'>
            <i class="bi bi-gear-wide-connected"></i>
            <span>Settings</span>
          </div>
          <div className='settings-box'>

          </div>
      </nav>
    );
}

export default Navbar;