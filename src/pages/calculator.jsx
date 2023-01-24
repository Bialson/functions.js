import { useContext, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Chart from '../components/Plot';
import { IsLoading } from '../context/loading';
import Loader from '../components/Loader';
import { PlotState } from '../context/plotState';
import Sidebar from '../components/Sidebar';

const Calculator = () => {
	const Plot = useContext(PlotState);
	const [loading, setLoading] = useState(true);
	const [plot, setPlot] = useState(Plot.plot);
	const loadingState = useMemo(
		() => ({ loading, setLoading }),
		[loading]
	);
	const plotSettings = useMemo(
		() => ({ plot, setPlot }),
		[plot]
	);
	return (
		<>
			{loading ? <Loader /> : null}
			<Navbar />
			<IsLoading.Provider value={loadingState}>
				<PlotState.Provider value={plotSettings}>
					<Chart />
					<Sidebar />
				</PlotState.Provider>
			</IsLoading.Provider>
		</>
	);
};

export default Calculator;
