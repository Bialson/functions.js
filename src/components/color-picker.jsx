import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

export default class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color:{
                r: this.props.r || '0',
                g: this.props.g || '0',
                b: this.props.b || '0',
                a: this.props.a || '1',
            },
        };
        this.colorHex = React.createRef();
        this.opacity = React.createRef();
    }
    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    }
    handleClose = () => {
        this.setState({displayColorPicker: false});
    }
    handleChange = (color) => {
        this.setState({color: color.rgb});
    }
    colorToHex = (color) => {
        let hexadecimal = color.toString(16);
        return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
    }
    convertToHex = (color) => {
        return this.colorToHex(color.r)  + this.colorToHex(color.g)  + this.colorToHex(color.b);
    }
    componentDidUpdate(){
        const hex = this.convertToHex(this.state.color);
        this.colorHex.current.value = hex.toUpperCase();
        this.opacity.current.value = this.state.color.a * 100 + "%";
    }
    render(){
        const rgba = this.state.color;
        const sketchStyle = {
            'default': {
                picker:{
                    background: 'field',
                },
            },
            container: {
                justifyContent: 'space-around',
                marginTop: '10px',
                display: this.state.displayColorPicker ? 'flex' : 'none',
            }
        };
        const itemStyle = reactCSS({
            'default': {
                colorContainer: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                },
                color: {
                    width: '20px',
                    height: '20px',
                    borderRadius: '5px',
                    background: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
                    cursor: 'pointer',
                    padding: '2.5px',
                },
                colorCode:{
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: 'white',
                    fontSize: '12px',
                    borderRadius: '3px',
                    border: 'none',
                    width: '50px',
                    textAlign: 'center',
                },
                opacity:{
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: 'white',
                    fontSize: '12px',
                    borderRadius: '3px',
                    border: 'none',
                    width: '40px',
                    textAlign: 'center',
                },
                clickBox: {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                }
            }
        });
        return(
            <div className='input-item'>
                <div className='settings-name'>
                    <span>{this.props.name}</span>
                </div>
                <div style={itemStyle.clickBox}>
                    <div style={itemStyle.colorContainer}>
                        <div style={itemStyle.color} onClick={this.handleClick} title='Open color box'></div>
                    </div>
                    <div style={sketchStyle.container}>
                        {this.state.displayColorPicker ? 
                            <SketchPicker color={this.state.color} onChange={ this.handleChange } styles={sketchStyle}/>
                        : null}
                        <i className="bi bi-x-lg" title='Close' onClick={this.handleClose}></i>
                    </div>
                    <input type="text" style={itemStyle.colorCode} ref={this.colorHex}/>
                    <input type="text" style={itemStyle.opacity} ref={this.opacity}/>
                </div>
            </div>
        )
    }
}