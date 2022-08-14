import './../css/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import Navbar from '../components/navbar';
import Chart from './../components/plot';
import Sidebar from './../components/sidebar';

const Calculator = () => {
    return(
        <>
          <Navbar />
          <Chart />
          <Sidebar />
        </>
    )
}

export default Calculator;