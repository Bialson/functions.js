import React from "react";
import Plot from "react-plotly.js";
import gdData from "../data/gdData.json";

const Chart = () => {
    return(
        <div className='chart-container'>
            <Plot
            data={gdData.data}
            layout={gdData.layout}
            revision={gdData.revision}
            config={gdData.config}
            useResizeHandler={true}
            style={{width: '80%', height: '100%'}}
            />
        </div>
    )
}

export default Chart;