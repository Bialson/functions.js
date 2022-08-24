import React,  {useState} from 'react';
import icon from './../img/icons/logo256.png';
import {motion} from 'framer-motion';
import TeX from '@matejmazur/react-katex';

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    // const [isHovered, setIsHovered] = useState(false);
    const [style, setStyle] = useState('dark');
    // const showSettingsBox = () => {
    //   setIsActive(true);
    // }
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
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="e^{(-x^2 - y^2)}"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="\frac{1}{x^2 + y^2 + 1}"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="xy^3 - x^3y"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="x^4y^2 - 10x^2y^2 - y^2"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="e^{sin(\sqrt{|x + y|}) + \sqrt{|x - y|}} - 2"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="e^{cos(xy)} - 1"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="\frac{14cos(\frac{(x^2 + y^2)}{4})}{x^2 + y^2 + 3}"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="e^{sin(xy) - cos(x^2 + (-3y)^2)}"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="e^{sin(xy) - cos(x^2 + y^2)}"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="e^{-1 * x^2 - y^2}"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="sin(3sin(x^2 + y^2))"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="sin(\sqrt{x^2 + y^2})"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="sin(x + y^2)"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="xy"> 
              </TeX>
            </li>
            <li className="item">
              <TeX
                  className="output"
                  settings={{ macros: { '*': String.raw`\cdot` } }}
                  math="x * e^{-x^2 - y^2}"> 
              </TeX>
            </li>
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
          </ul>
      </nav>
    );
}

export default Navbar;