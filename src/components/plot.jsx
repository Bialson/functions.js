import { useContext, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { IsLoading } from '../context/loading';
import { PlotState } from '../context/plotState';

const Chart = () => {
	const { setLoading } = useContext(IsLoading);
	const { plot } = useContext(PlotState);
	useEffect(() => {
		setLoading(false);
	}, []);
	return (
		<>
			<div className="chart-container">
				<Plot
					data={plot.data}
					layout={plot.layout}
					revision={plot.revision}
					config={plot.config}
					useResizeHandler={true}
					style={{ width: '80%', height: '100%' }}
				/>
			</div>
		</>
	);
};

export default Chart;
