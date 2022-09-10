import React, { useRef, useState, useEffect} from 'react';
import Plotly from "plotly.js/dist/plotly.js";
import { CodeBlock, CopyBlock, vs2015} from "react-code-blocks";
import TeX from '@matejmazur/react-katex';
import ColorPicker from './color-picker';
import gdData from "../data/gdData.json";

const Material = () => {
    const [bgColor, setBgColor] = useState('rgba()');
    const [axisColor, setAxisColor] = useState('rgba()');
    const [meshColor, setMeshColor] = useState('rgba()');
    const [colorMap, setColorMap] = useState("Jet");
    const [opacity, setOpacity] = useState(1);
    useEffect(() => {
        const changeColors = () => {
            let div = document.querySelector('.js-plotly-plot');
            let cont = document.querySelector('.chart-container');

            cont.style.backgroundColor = `${bgColor}`;

            gdData.layout.scene.xaxis.gridcolor = 
            gdData.layout.scene.yaxis.gridcolor = 
            gdData.layout.scene.zaxis.gridcolor = 
            `${axisColor}`;

            gdData.layout.scene.xaxis.tickfont.color = 
            gdData.layout.scene.yaxis.tickfont.color = 
            gdData.layout.scene.zaxis.tickfont.color = 
            `${axisColor}`;

            gdData.layout.scene.xaxis.color = 
            gdData.layout.scene.yaxis.color = 
            gdData.layout.scene.zaxis.color = 
            `${axisColor}`;

            gdData.layout.scene.xaxis.title.font.color = 
            gdData.layout.scene.yaxis.title.font.color = 
            gdData.layout.scene.zaxis.title.font.color = 
            `${axisColor}`;

            gdData.data[0].colorbar.tickfont.color = `${axisColor}`;

            gdData.data[0].contours.x.color = 
            gdData.data[0].contours.y.color = 
            gdData.data[0].contours.z.color =
            `${meshColor}`;

            gdData.data[0].colorscale = colorMap;

            gdData.data[0].opacity = opacity;

            Plotly.react(div, gdData.data, gdData.layout, gdData.config, gdData.revision);
        }
        changeColors();
    }, [bgColor, axisColor, colorMap, meshColor, opacity]);
    return(
        <>
            <ColorPicker setColor={color => setBgColor(color)} name='Background' r='26' g='38' b='59' a='1'/>
            <ColorPicker setColor={color => setAxisColor(color)} name='Axis' r='255' g='255' b='255' a='1'/>
            <ColorPicker setColor={color => setMeshColor(color)} name='Mesh' r='0' g='0' b='0' a='1'/>
            <div className='input-item'>
                <span className='settings-name'>Colorscale</span>
                <select className='colormaps' onChange={(event) => setColorMap(event.target.value)}>
                    <option>Jet</option>
                    <option>YlOrRd</option>
                    <option value={[
                        ['0.0', 'rgb(165,0,38)'],
                        ['0.111111111111', 'rgb(215,48,39)'],
                        ['0.222222222222', 'rgb(244,109,67)'],
                        ['0.333333333333', 'rgb(253,174,97)'],
                        ['0.444444444444', 'rgb(254,224,144)'],
                        ['0.555555555556', 'rgb(224,243,248)'],
                        ['0.666666666667', 'rgb(171,217,233)'],
                        ['0.777777777778', 'rgb(116,173,209)'],
                        ['0.888888888889', 'rgb(69,117,180)'],
                        ['1.0', 'rgb(49,54,149)']
                    ]}>Heat</option>
                    <option>YlGnBu</option>
                    <option>RdBu</option>
                    <option>Portland</option>
                    <option>Picnic</option>
                    <option>Hot</option>
                    <option>Greys</option>
                    <option>Greens</option>
                    <option>Electric</option>
                    <option>Earth</option>
                    <option>Bluered</option>
                    <option>Blackbody</option>
                </select>
            </div>
            <div className='input-item'>
                <span className='settings-name'>Opacity</span>
                <input type="range" defaultValue={100} className='opacity-range' step={1} min={0} max={100} onChange={(event) => setOpacity(event.target.value / 100)}></input>
            </div>
        </>
    )
}
  
const Layout = () => {
    const [axis, showAxis] = useState(true);
    const [mesh, showMesh] = useState(false);
    const [surface, showSurface] = useState(true);
    useEffect(() => {
        let div = document.querySelector('.js-plotly-plot');

        gdData.data[0].hidesurface = !surface;

        gdData.data[0].contours.x.show = 
        gdData.data[0].contours.y.show =
        gdData.data[0].contours.z.show = mesh;

        gdData.layout.scene.xaxis.showgrid = 
        gdData.layout.scene.yaxis.showgrid =
        gdData.layout.scene.zaxis.showgrid = 
        axis;

        gdData.layout.scene.xaxis.zeroline = 
        gdData.layout.scene.yaxis.zeroline =
        gdData.layout.scene.zaxis.zeroline = 
        axis;

        gdData.layout.scene.xaxis.showticklabels = 
        gdData.layout.scene.yaxis.showticklabels =
        gdData.layout.scene.zaxis.showticklabels = 
        axis;

        Plotly.react(div, gdData.data, gdData.layout, gdData.config, gdData.revision);
    }, [axis, mesh, surface]);
    return(
        <div className='input-container'>
            <div className='input-item'>
                <span className='settings-name'>Axis</span>
                <input type='checkbox' className='checkbox-settings' defaultChecked={true} onChange={() => showAxis(current => !current)}/>
            </div>
            <div className='input-item'>
                <span className='settings-name'>Mesh</span>
                <input type='checkbox' className='checkbox-settings' onChange={() => showMesh(current => !current)}/>
            </div>
            <div className='input-item'>
                <span className='settings-name'>Surface</span>
                <input type='checkbox' className='checkbox-settings' onChange={() => showSurface(current => !current)} defaultChecked={true}/>
            </div>
        </div>
    )
}

const MathOps = () => {
    const [plotTitle, changePlotTitle] = useState('f(x,y) = ');
    const [mathConvFormula, setMathConvFormula] = useState('');
    const [xRange, setXRange] = useState({min: -5, max: 5});
    const [yRange, setYRange] = useState({min: -5, max: 5});
    const generateRangeData = (start, end) => {
        let arr = [];
        for(let i = start; i <= end; i++) {
            arr.push(i);
        }
        return arr;
    }
    const handleChange = (event) =>{
        changePlotTitle(event.target.value);
        let formula = event.target.value;
        formula = formula.replace(/\^/g, '**')
                .replace(/\\frac\{(.+?)\}\{(.+?)\}/g, "($1)/($2)")
                .replace(/\\sqrt\{(.+?)\}/g, "Math.sqrt($1)")
                .replace(/\\sqrt\[3\]\{(.+?)\}/g, "Math.cbrt($1)")
                .replace(/\{(.+?)\}/g, "($1)")
                .replace(/\|(.+?)\|/g, "Math.abs($1)")
                .replace(/\b\w*sin\w*\((.+?)\)/g, "Math.sin($1)")
                .replace(/\b\w*cos\w*\((.+?)\)/g, "Math.cos($1)")
                .replace(/\b\w*tg\w*\((.+?)\)/g, "Math.tan($1)");
        setMathConvFormula(formula);
    }
    const changeXDomain = (event) => {
        console.log(event.target.name);
        let value = parseInt(event.target.value, 10);
        switch(event.target.name){
            case "min":
                setXRange({min: value, max: xRange.max});
                break;
            case "max":
                setXRange({min: xRange.min, max: value});
                break;
            default:
                break;
        }
    }
    const changeYDomain = (event) => {
        console.log(event.target.name);
        let value = parseInt(event.target.value, 10);
        switch(event.target.name){
            case "min":
                setYRange({min: value, max: yRange.max});
                break;
            case "max":
                setYRange({min: yRange.min, max: value});
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        let div = document.querySelector('.js-plotly-plot');
        let X = generateRangeData(xRange.min, xRange.max);
        let Y = generateRangeData(yRange.min, yRange.max);
        let Z = X.map((x) => {
            return Y.map((y) => {
                return x * y;
            });
        });
        console.log(mathConvFormula);
        gdData.data[0].x = X;
        gdData.data[0].y = Y;
        gdData.data[0].z = Z;
        gdData.revision += 1;
        gdData.layout.datarevision += 1;
        Plotly.react(div, gdData.data, gdData.layout, gdData.config, gdData.revision);
    }, [xRange, yRange, mathConvFormula]);
    return(
        <><div className='input-container'>
            <div className='input-item'>
                <span className='settings-name'>Formula</span>
                <input type='search' className='input formula_input' placeholder='f(x, y) = ...' defaultValue='f(x, y) = ' onChange={handleChange}/>
            </div>
            <br/>
            <TeX
                className="output-sidebar"
                settings={{ macros: { '*': String.raw`\cdot` } }}>
                {plotTitle}
            </TeX><br/><br/><br/>
            <span className='settings-name'>Domain</span>
            <div className='input-item'>
                <span className='settings-name'><i><TeX>x</TeX></i></span>
                <input type='number' className='input' defaultValue={-5} onChange={changeXDomain} name="min"/>
                <hr/>
                <input type='number' className='input' defaultValue={5} onChange={changeXDomain} name="max"/>
            </div>
            <div className='input-item'>
                <span className='settings-name'><i><TeX>y</TeX></i></span>
                <input type='number' className='input' defaultValue={-5} onChange={changeYDomain} name="min"/>
                <hr/>
                <input type='number' className='input' defaultValue={5} onChange={changeYDomain} name="max"/>
            </div>
        </div>
        <div className='math-analyze'>

        </div></>
    )
}

const Code = () => {
    const codeToJSON = (code) => {
        return JSON.stringify(code, null, 2);
    }
    const [currentSettings, changeSettings] = useState(codeToJSON(gdData));
    useEffect(() => {
        setInterval(() => {
            changeSettings(codeToJSON(gdData));
        }, 4000);
    }, []);
    return(
        <div className='input-item'>
            <CodeBlock 
                text={currentSettings}
                theme={vs2015}
                showLineNumbers={false}
                language="json"Add-AppxPackage
            />
        </div>
    )
}

const Export = () => {
    const [format, changeFormat] = useState('svg');
    const plotDivRef = useRef(null);
    const downloadImage = () => {
        const div = document.querySelector('.js-plotly-plot');
        Plotly.downloadImage(div, {format: format, filename: 'plot'});
    }
    const generateImage = async () =>{
        let div = document.querySelector('.js-plotly-plot');
        const url = await Plotly.toImage(div, {format: 'svg'});
        plotDivRef.current.src = url;
    }
    useEffect(() => {
        generateImage();
    }, []);
    return(
        <div className='input-container'>
            <div className='input-item'>
                <span className='settings-name'>Format</span>
                <div className='formats'>
                    <input type="radio" value="svg" name="format" onClick={() => changeFormat('svg')} defaultChecked={true}/> .svg
                    <input type="radio" value="png" name="format" onClick={() => changeFormat('png')}/> .png
                    <input type="radio" value="jpg" name="format" onClick={() => changeFormat('jpg')}/> .jpg
                </div>
            </div>
            <img ref={plotDivRef} alt='Export previev' width={216} title='Plot preview'/>
            <div className='input-item'>
                <input type='submit' className='downloadImgBtn' value='Generate' onClick={() => {generateImage()}} title='Download image'/>
                <input type='submit' className='downloadImgBtn' value='Download' onClick={() => downloadImage()} title='Download image'/>
            </div>
        </div>
    );
}

export {
    Material,
    Layout,
    MathOps,
    Code, 
    Export
}