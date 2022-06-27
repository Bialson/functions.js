import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { Component, useState } from 'react';
import Plot from 'react-plotly.js';
import { ReactComponent as Icon} from './img/logo.svg';

const Chart = (props) => {
  const z1 = [
    [8.83,8.89,8.81,8.87,8.9,8.87],
    [8.89,8.94,8.85,8.94,8.96,8.92],
    [8.84,8.9,8.82,8.92,8.93,8.91],
    [8.79,8.85,8.79,8.9,8.94,8.92],
    [8.79,8.88,8.81,8.9,8.95,8.92],
    [8.8,8.82,8.78,8.91,8.94,8.92],
    [8.75,8.78,8.77,8.91,8.95,8.92],
    [8.8,8.8,8.77,8.91,8.95,8.94],
    [8.74,8.81,8.76,8.93,8.98,8.99],
    [8.89,8.99,8.92,9.1,9.13,9.11],
    [8.97,8.97,8.91,9.09,9.11,9.11],
    [9.04,9.08,9.05,9.25,9.28,9.27],
    [9,9.01,9,9.2,9.23,9.2],
    [8.99,8.99,8.98,9.18,9.2,9.19],
    [8.93,8.97,8.97,9.18,9.2,9.18]
];
  return(
    <div className="plotContainer">
      <Plot className='plot'
        data={[
          {
            z: z1,
            type: 'surface',
          }
        ]}
        layout={{
          title: 'Support',
          scene:{
            camera:{
              eye:{x: 1.5, y: 1.5, z: 1.25}
            }
          },
          template: 'plotly_dark'
        }}
        config={{responsive: true}}
      />
    </div>
  )
}

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
            </div>
          </ul>
      </nav>
    );
}

class Main extends Component {
  render() {
    return(
      <div className='main'>
        {/* <Chart /> */}
      </div>
    )
  }
}

function App() {
  return (
    <><Navbar /><Main className='main' /><Code /></>
  );
}

export default App;
