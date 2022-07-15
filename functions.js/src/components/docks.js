import React, { Component } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {githubDark} from '@uiw/codemirror-theme-github';
import { javascript } from '@codemirror/lang-javascript';
import Chart from './../components/plot';
import Plotly from "plotly.js/dist/plotly.js";
import loadingImg  from './../img/icons/Photos-app-icon-256-colorful.png';
import TeX from '@matejmazur/react-katex';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import {motion} from 'framer-motion';

class Colors extends Component {
    state = {
        displayColorPicker: false,
        color: {
          r: '0',
          g: '0',
          b: '0',
          a: '1',
        },
    };
    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };
    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };
    handleChange = (color) => {
        this.setState({ color: color.rgb})
    };
    render(){
        const styles = reactCSS({
            'default': {
                color: {
                    margin: '0 auto',
                    width: '50px',
                    height: '21px',
                    border: 'none',
                    borderRadius: '3px',
                    background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
                    padding: '1px 0px',
                },
                swatch: {
                    background: 'transparent',
                    borderRadius: '4px',
                    display: 'block',
                    cursor: 'pointer',
                    margin: '0 auto',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                    opacity: '0',
                    marginTop: '30px'
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
                container: {
                    marginTop: '20px',
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            },
        });
        const sketchStyle = {
            'default':{
                picker:{
                    background: 'field',
                },
                input:{
                    width: '100%',
                }
            }
        }
        const rgba = this.state.color;
        return(
            <div className='input-container'>
                <div className='input-item'>
                    <div className='settings-name'>
                        <span>Background</span>
                    </div>
                    <div style={styles.container}>
                        <div style={ styles.swatch } onClick={ this.handleClick }>
                        <span style={{margin: '0', padding: '2px 15px', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '4px'}}>{
                            `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
                        }</span>
                    </div>
                    <div style={ styles.color } /></div>
                    { 
                        this.state.displayColorPicker ? 
                            <motion.div style={ styles.popover } animate={{opacity: 1}}>
                                <div style={ styles.cover } onClick={ this.handleClose }/>
                                    <SketchPicker color={ this.state.color } onChange={ this.handleChange } styles={sketchStyle}/>
                            </motion.div> 
                        : null 
                    }
                </div>
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
    constructor(props){
        super(props);
        this.state = {value: 'f(x, y) = '};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({value : event.target.value});
        const div = document.querySelector('.js-plotly-plot');
        Plotly.update(div, {}, {title: event.target.value || 'f(x, y) = '});
    }
    render(){
        return(
            <><div className='input-container'>
                <div className='input-item'>
                    <span className='settings-name'>Formula </span>
                    <input type='search' className='input' placeholder='f(x, y) = ...' defaultValue='f(x, y) = ' onChange={this.handleChange}/><br></br>
                    <TeX
                        className="output"
                        settings={{ macros: { '*': String.raw`\cdot` } }}>
                        {this.state.value}
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
        this.state = {
            format: 'svg'
        }
    }
    async getImage() {
        const div = document.querySelector('.js-plotly-plot');
        const url = await Plotly.toImage(div, {format: 'svg'});
        this.imgRef.current.src = url;
    };
    downloadImage(){
        const div = document.querySelector('.js-plotly-plot');
        Plotly.downloadImage(div, {format: this.state.format, filename: 'plot'});
    }
    render(){
        this.getImage();
        return(
            <div className='input-container'>
                <img ref={this.imgRef} src={loadingImg} alt='Export previev' width={263}/>
                <p>Format</p>
                <div className='formats'>
                    <input type="radio" value="svg" name="format" onClick={() => this.setState({format: 'svg'})}/> .svg
                    <input type="radio" value="png" name="format" onClick={() => this.setState({format: 'png'})}/> .png
                    <input type="radio" value="jpg" name="format" onClick={() => this.setState({format: 'jpg'})}/> .jpg
                </div>
                <br></br><br></br>
                <input type='submit' className='downloadImgBtn' value='Download' onClick={() => this.downloadImage()} />
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