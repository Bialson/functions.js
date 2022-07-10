import React, { Component } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {githubDark} from '@uiw/codemirror-theme-github';
import { javascript } from '@codemirror/lang-javascript';
import Chart from './../components/plot';
import Plotly from "plotly.js/dist/plotly.js";


class Colors extends Component {
    render(){
      return(
        <div>
          Colors
        </div>
      )
    }
}
  
class Layout extends Component{
    render(){
      return(
        <div>
          Layout
        </div>
      )
    }
}

class Math extends Component{
    render(){
        return(
            <><div className='input-container'>
                <div className='input-item'>
                    <span className='settings-name'>Formula </span>
                    <input type='search' className='input' placeholder='f(x, y) = ...' />
                </div>
                <div className='input-item'>
                    <span className='settings-name'><i>X</i> axis domain </span>
                    <input type='number' className='input' placeholder='0' />
                </div>
                <div className='input-item'>
                    <span className='settings-name'><i>Y</i> axis domain </span>
                    <input type='number' className='input' placeholder='0' />
                </div>
            </div><div className='math-analyze'>
                <h3 style={{fontWeight: 500, marginTop: 100}}>Math analyze</h3>
            </div></>
        )
    }
}

class Code extends Component{
    render(){
        const code = `${Chart}`;
        return(
            <div className='input-container' style={{width: '500px'}}>
                <div className='code-box'>
                    <CodeMirror 
                    value={code}
                    theme={githubDark}
                    extensions={[javascript({ jsx: true })]}
                    />
                </div>
            </div>
        )
    }
}

class Export extends Component{
    constructor(props){
        super(props);
        this.imgRef = React.createRef();
    }
    async getImage() {
        const div = document.querySelector('.js-plotly-plot');
        const url = await Plotly.toImage(div, {format: 'svg'});
        this.imgRef.current.src = url;
    };
    render(){
        this.getImage();
        return(
            <div className='input-container'>
               <img ref={this.imgRef} alt='Export previev' width={263}/>
            </div>
        )
    }
}

export {
    Colors,
    Layout,
    Math,
    Code, 
    Export
}