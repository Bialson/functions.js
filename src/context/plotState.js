import { createContext } from "react";

export const PlotState = createContext({
    plot: {
        data: [{
            x: [-1, 0, 1],
            y: [-1, 0, 1],
            z: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            type: "surface",
            colorbar: {
                tickfont: {
                    color: "white"
                },
                y: -0.2,
                orientation: "h",
            },
            colorscale: "Jet",
            contours: {
                x: { show: false, color: "rgba(255,255,255, 1)", width: 16 },
                y: { show: false, color: "rgba(255,255,255, 1)", width: 16 },
                z: { show: false, color: "rgba(255,255,255, 1)", width: 16 }
            },
            hidesurface: false,
            opacity: 1
        }],
        layout: {
            paper_bgcolor: "rgba(40, 40, 40, 0)",
            scene: {
                xaxis: {
                    color: "white",
                    gridcolor: "white",
                    tickfont: {
                        color: "white"
                    },
                    title: {
                        font: {
                            color: "white"
                        }
                    },
                    zeroline: true,
                    showgrid: true,
                    showticklabels: true,
                    gridwidth: 3
                },
                yaxis: {
                    color: "white",
                    gridcolor: "white",
                    tickfont: {
                        color: "white"
                    },
                    title: {
                        font: {
                            color: "white"
                        }
                    },
                    zeroline: true,
                    showgrid: true,
                    showticklabels: true,
                    gridwidth: 3
                },
                zaxis: {
                    color: "white",
                    gridcolor: "white",
                    tickfont: {
                        color: "white"
                    },
                    title: {
                        font: {
                            color: "white"
                        }
                    },
                    zeroline: true,
                    showgrid: true,
                    showticklabels: true,
                    gridwidth: 3
                },
                camera: {
                    eye: {
                        x: 2
                    }
                },
                aspectratio: {
                    x: 1,
                    y: 1,
                    z: 1
                },
                aspectmode: "auto"
            },
            datarevision: 0,
            margin: {
                b: 10,
                t: 10
            },
            autosize: true
        },
        config: {
            responive: true,
            modeBarButtonsToRemove: [
                "toImage",
                "resetCameraDefault3d"
            ]
        },
        revision: 0
    },
    setPlot: () => {}
});