import React, { useContext, forwardRef, useEffect } from "react";
import Plot from "react-plotly.js";
import Sidebar from "./sidebar";
import {IsLoading} from "../context/loading";
import {PlotState} from "../context/plotState";

const Chart = forwardRef((props, ref) => {
    const {setLoading} = useContext(IsLoading);
    const plotState = useContext(PlotState);
    useEffect(() => {
        setLoading(false);
    });
    useEffect(() => console.log("Renderowanie komponentu plot"));
    return(
        <>
            <div className='chart-container'>
                <Plot
                    ref={ref}
                    data={plotState.plot.data}
                    layout={plotState.plot.layout}
                    revision={plotState.plot.revision}
                    config={plotState.plot.config}
                    useResizeHandler={true}
                    style={{width: '80%', height: '100%'}}
                />
            </div>
            <Sidebar plotRef={ref}/>
        </>
    )
});

export default Chart;