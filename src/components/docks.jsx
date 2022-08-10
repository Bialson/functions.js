import React, { useRef, useState, useEffect} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {githubDark} from '@uiw/codemirror-theme-github';
import { javascript } from '@codemirror/lang-javascript';
import Plotly from "plotly.js/dist/plotly.js";
import loadingImg  from './../img/icons/Photos-app-icon-256-colorful.png';
import TeX from '@matejmazur/react-katex';
import ColorPicker from './color-picker';
import gdData from "../data/gdData.json";

const Colors = () => {
    const [bgColor, setBgColor] = useState('rgba()');
    const [axisColor, setAxisColor] = useState('rgba()');
    useEffect(() => {
        const changeBgColor = () => {
            let div = document.querySelector('.js-plotly-plot');
            let cont = document.querySelector('.chart-container');

            cont.style.backgroundColor = `${bgColor}`;

            gdData.layout.scene.xaxis.gridcolor = gdData.layout.scene.yaxis.gridcolor = gdData.layout.scene.zaxis.gridcolor = `${axisColor}`;

            gdData.layout.scene.xaxis.tickfont.color = gdData.layout.scene.yaxis.tickfont.color = gdData.layout.scene.zaxis.tickfont.color = `${axisColor}`;

            gdData.layout.scene.xaxis.color = gdData.layout.scene.yaxis.color = gdData.layout.scene.zaxis.color = `${axisColor}`;

            gdData.layout.scene.xaxis.title.font.color = gdData.layout.scene.yaxis.title.font.color = gdData.layout.scene.zaxis.title.font.color = `${axisColor}`;


            Plotly.react(div, gdData.data, gdData.layout, gdData.config, gdData.revision);
        }
        changeBgColor();
    }, [bgColor, axisColor]);
    return(
        <>
            <ColorPicker setColor={color => setBgColor(color)} name='Background' r='0' g='0' b='0' a='0'/>
            <ColorPicker setColor={color => setAxisColor(color)} name='Axis' r='255' g='255' b='255' a='1'/>
            {/* <ColorPicker name='Surface' /> */}
            {bgColor}
            <br/>
            {axisColor}
            {/* <button onClick={changeBgColor}>Click</button> */}
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
    return(
        <><div className='input-container'>
            <div className='input-item'>
                <span className='settings-name'>Formula </span>
                <input type='search' className='input' placeholder='f(x, y) = ...' defaultValue='f(x, y) = ' onChange={handleChange}/><br></br>
                <TeX
                    className="output"
                    settings={{ macros: { '*': String.raw`\cdot` } }}>
                    {plotTitle}
                </TeX>
            </div>
            <div className='input-item'>
                <span className='settings-name'><i><TeX>x</TeX></i> axis domain </span>
                <input type='number' className='input' placeholder='0' />
            </div>
            <div className='input-item'>
                <span className='settings-name'><i><TeX>y</TeX></i> axis domain </span>
                <input type='number' className='input' placeholder='0' />
            </div>
        </div><div className='math-analyze'>
            <h3 style={{fontWeight: 400, marginTop: 100, fontSize: '1.15rem'}}>Math analyze</h3>
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
    Colors,
    Layout,
    Math,
    Code, 
    Export
}