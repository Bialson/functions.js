import './../css/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useContext } from 'react';
import Navbar from '../components/navbar';
import Chart from './../components/plot';
import { IsLoading } from '../context/loading';
import Loader from '../components/loader';
import { PlotState } from '../context/plotState';

const Calculator = () => {
	const [loading, setLoading] = React.useState(true);
	const loadingState = React.useMemo(
		() => ({ loading, setLoading }),
		[loading]
	);
	const Plot = useContext(PlotState);
	const [plot, setPlot] = React.useState(Plot.plot);
	const plotSettings = React.useMemo(
		() => ({ plot, setPlot }),
		[plot]
	);
	useEffect(() => {
		console.log('Renderowanie komponentu kalkulator');
		console.log(plotSettings);
	});
	return (
		<>
			{loading ? <Loader /> : null}
			<Navbar />
			<IsLoading.Provider value={loadingState}>
				<PlotState.Provider value={plotSettings}>
					<Chart />
				</PlotState.Provider>
			</IsLoading.Provider>
		</>
	);
};

export default Calculator;
