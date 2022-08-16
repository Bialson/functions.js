import React, { useRef, useState, useEffect} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {githubDark} from '@uiw/codemirror-theme-github';
import { javascript } from '@codemirror/lang-javascript';
import Plotly from "plotly.js/dist/plotly.js";
import loadingImg  from './../img/icons/Photos-app-icon-256-colorful.png';
import TeX from '@matejmazur/react-katex';
import ColorPicker from './color-picker';
import gdData from "../data/gdData.json";

const Material = () => {
    const [bgColor, setBgColor] = useState('rgba()');
    const [axisColor, setAxisColor] = useState('rgba()');
    const [colorMap, setColorMap] = useState("Jet");
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

            gdData.data[0].colorscale = colorMap;

            Plotly.react(div, gdData.data, gdData.layout, gdData.config, gdData.revision);
        }
        changeColors();
    }, [bgColor, axisColor, colorMap]);
    return(
        <>
            <ColorPicker setColor={color => setBgColor(color)} name='Background' r='26' g='38' b='59' a='1'/>
            <ColorPicker setColor={color => setAxisColor(color)} name='Axis' r='255' g='255' b='255' a='1'/>
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
        </>
    )
}
  
const Layout = () => {
    const updateLayout = () => {
        const div = document.querySelector('.js-plotly-plot');
        gdData.data[0].colorscale = "Jet";
        gdData.layout.title.text = "sin(a)";
        gdData.revision += 1;
        Plotly.react(div, gdData.data, gdData.layout, gdData.config, gdData.revision);
    }
    return(
        <div>
            <input type="submit" onClick={updateLayout}/>
        </div>
    )
}

const Math = () => {
    const [plotTitle, changePlotTitle] = useState('f(x,y) = ');
    const handleChange = (event) =>{
        changePlotTitle(event.target.value);
        const div = document.querySelector('.js-plotly-plot');
        Plotly.update(div, {}, {title: event.target.value || 'f(x, y) = '});
    }
    const changeXDomain = (event) => {
        console.log(event.target.value);
    }
    const changeYDomain = (event) => {
        console.log(event.target.value);
    }
    return(
        <><div className='input-container'>
            <div className='input-item'>
                <span className='settings-name'>Formula</span>
                <input type='search' className='input' placeholder='f(x, y) = ...' defaultValue='f(x, y) = ' onChange={handleChange}/>
            </div>
            <TeX
                className="output"
                settings={{ macros: { '*': String.raw`\cdot` } }}>
                {plotTitle}
            </TeX><br/><br/>
            <span className='settings-name'>Domain</span>
            <div className='input-item'>
                <span className='settings-name'><i><TeX>x</TeX></i></span>
                <input type='number' className='input' placeholder='0' onChange={changeXDomain}/>
            </div>
            <div className='input-item'>
                <span className='settings-name'><i><TeX>y</TeX></i></span>
                <input type='number' className='input' placeholder='0' onChange={changeYDomain}/>
            </div>
        </div>
        <div className='math-analyze'>
            
        </div></>
    )
}

const Code = () => {
    const [currentSettings, changeSettings] = useState(gdData);
    useEffect(() => {
        setInterval(() => changeSettings(gdData), 2000);
    }, []);
    return(
        <div className='code-box'>
                <CodeMirror 
                value={JSON.stringify(currentSettings, null, 2)}
                theme={githubDark}
                extensions={[javascript({ jsx: true })]}
                />
        </div>
    )
}

const Export = () => {
    const [format, changeFormat] = useState('svg');
    const plotDivRef = useRef(null);
    const getImage = async () =>{
        const div = document.querySelector('.js-plotly-plot');
        const url = await Plotly.toImage(div, {format: 'svg'});
        plotDivRef.current.src = url;
    }
    const downloadImage = () => {
        const div = document.querySelector('.js-plotly-plot');
        Plotly.downloadImage(div, {format: format, filename: 'plot'});
    }
    useEffect(() => {
        getImage();
    }, []);
    return(
        <div className='input-container'>
            <img ref={plotDivRef} src={loadingImg} alt='Export previev' width={263}/>
            <p>Format</p>
            <div className='formats'>
                <input type="radio" value="svg" name="format" onClick={() => changeFormat('svg')}/> .svg
                <input type="radio" value="png" name="format" onClick={() => changeFormat('png')}/> .png
                <input type="radio" value="jpg" name="format" onClick={() => changeFormat('jpg')}/> .jpg
            </div>
            <br></br><br></br>
            <input type='submit' className='downloadImgBtn' value='Download' onClick={() => downloadImage()} />
        </div>
    );
}

export {
    Material,
    Layout,
    Math,
    Code, 
    Export
}