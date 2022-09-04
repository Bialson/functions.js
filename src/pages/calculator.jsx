import './../css/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import Navbar from '../components/navbar';
import Chart from './../components/plot';
import Sidebar from './../components/sidebar';
import { MathExampleFormula } from '../components/formula';
import { useState, useMemo } from 'react';

const Calculator = () => {
    const [globalFormula, setGlobalFormula] = useState('f(x, y) =');
    const value = useMemo(() => ({ globalFormula, setGlobalFormula }), [globalFormula]);
    return(
        <>
          <MathExampleFormula.Provider value={value}>
            <Navbar />
            <Chart />
            <Sidebar />
          </MathExampleFormula.Provider>
        </>
    )
}

export default Calculator;