import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { Component, useState } from 'react';
import { ReactComponent as Icon} from './img/icons/logo.svg';
import Chart from './Plot';
// import Plotly from "plotly.js/dist/plotly.js";

/*Implement change function for plot component */

// function changeLayout(){
//   // const div = document.querySelector('.js-plotly-plot');
//   // Plotly.update(div, {colorscale: 'Hot'}, {title: 'jd'});
// }

class Main extends Component {
  render() {
    return(
      <div className='main'>
        <div className='chart-container'>
          <Chart />
        </div>
        <div className='plot-settings'>
          <div className='settings-dock'></div>
          <hr></hr>
          <ul>
            <li className='dock-item' title='Colors' id='colors'>
              <i class="bi bi-palette-fill"></i>
            </li>
            <li className='dock-item' title='Layout' id='layout'>
              <i class="bi bi-grid-1x2-fill"></i>
            </li>
            <li className='dock-item' title='Math' id='math'>
              <i class="bi bi-plus-slash-minus"></i>
            </li>
            <li className='dock-item' title='Code' id='code'>
              <i class="bi bi-code-slash"></i>
            </li>
            <li className='dock-item' title='Export as image' id='export_img'>
              <i class="bi bi-image-fill"></i>
            </li>
          </ul>
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
