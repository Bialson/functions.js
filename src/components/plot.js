import React, {Component} from "react";
import Plot from "react-plotly.js";
import gdData from "./../data/gdData.json";

export default class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                {
                    z: this.generateData(), 
                    type: 'surface',
                    colorbar: {
                        tickfont:{
                            color: 'white'
                        }
                    }
                }
            ], 
            layout: {
                paper_bgcolor: 'rgba(40, 40, 40, 0.75);',
                scene:{
                    xaxis:{
                        color: 'white',
                        gridcolor: 'white',
                        tickfont:{
                            color: 'white'
                        },
                        titlefont:{
                            color: 'white'
                        }
                    },
                    yaxis:{
                        color: 'white',
                        gridcolor: 'white',
                        tickfont:{
                            color: 'white'
                        },
                        titlefont:{
                            color: 'white'
                        }
                    },
                    zaxis:{
                        color: 'white',
                        gridcolor: 'white',
                        tickfont:{
                            color: 'white'
                        },
                        titlefont:{
                            color: 'white'
                        }
                    },
                    camera:{
                        eye:{
                            x: 2
                        }
                    }
                },
                title: 'f(x, y) = ',
                titlefont: {
                    color: 'white'
                },
                datarevision: 0, 
                margin:{
                    b: 40,
                    l: 0,
                    r: 0,
                    t: 50
                }, 
                autosize: true,
            }, 
            config: {
                responive: true,
                modeBarButtonsToRemove: ['toImage', 'resetCameraDefault3d'] 
            }, revision: 0
        };
    }
    generateData(){
        const z1 = [
            [8.82,8.89,8.81,8.87,8.9,8.87],
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
        return z1;
    }
    render(){
        return(
            <Plot
                data={gdData.data}
                layout={gdData.layout}
                revision={gdData.revision}
                config={gdData.config}
                useResizeHandler={true}
                onUpdate={(figure) => {this.setState(figure)}}
                style={{width: '100%', height: '90%'}}
            />
        )
    }
}