import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { Component, useState } from 'react';
import { ReactComponent as Icon} from './img/logo.svg';
import Chart from './Plot';
// import Plotly from "plotly.js/dist/plotly.js";

/*Implement change function for plot component */

// function changeLayout(){
//   // const div = document.querySelector('.js-plotly-plot');
//   // Plotly.update(div, {colorscale: 'Hot'}, {title: 'jd'});
// }

class Code extends Component {
  render(){
    return(
      <div className="terminal">
        <i className="bi bi-terminal-fill"></i>
      </div>
    )
  }
}

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const [style, setStyle] = useState('dark');
    const showSettingsBox = () => {
      setIsActive(true);
    }
    const closeSettingsBox = () => {
      setIsActive(false);
    }
    const changeStyle = () => {
      setStyle((style === 'dark') ? 'light' : 'dark');
    }
    const navClasses = `navbar ${style}`;
    const themeIcon = `bi ${(style === 'dark') ? 'bi-moon-fill' : 'bi-brightness-high-fill'}`;
    return(
      <nav className={navClasses}>
          <p className='logoNav'><Icon alt='icon' width={64} height={64}/>&nbsp;Functions.js</p>
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
            <li className='item' onClick={showSettingsBox} title='Settings'>
                <span className='icon'>
                  <i className="bi bi-gear-wide-connected"></i>
                </span>
                <span className='text'>Settings</span>
            </li>
            <div className='settings-box' style={{
              animation: isActive ? 'showSettingsBox 0.5s forwards' : 'hideSettingsBox 0.5s forwards'
            }}>
              <i className="bi bi-x-lg closeSettings" title='Close' onClick={closeSettingsBox}></i>
              <p>
                <span className='themeBox' onClick={changeStyle}>
                  <span className='themeCircle' style={{left: (style === 'dark') ? '0px' : '20px'}}>
                     <i className={themeIcon} style={{color: 'black'}}></i>
                  </span>
                </span>
                Theme
              </p>
              <br></br>
              <p style={{fontWeight: '600'}}>Functions.JS: v0.0.1
                  React: v{React.version}
              </p>
              <p style={{fontWeight: '300'}}>Copyright &copy; 2022 Bartłomiej Białek</p>
            </div>
          </ul>
      </nav>
    );
}

class Main extends Component {
  render() {
    return(
      <div className='main'>
        <div className='chart-container'>
          <Chart />
        </div>
        <div className='plot-settings'>
          <ul>
            <li>
              <p>Function: </p>
              <p><input type='text' placeholder='f(x, y = ...'></input></p>
            </li>
            <li>
              <p>Surface: </p>
            </li>
          </ul>
          <Code />
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <><Navbar /><Main className='main' /></>
  );
}

export default App;
