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
        }
    }
    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    }
    handleClose = () => {
        this.setState({displayColorPicker: false});
    }
    handleChange = (color) => {
        this.setState({color: color.rgb})
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
                    marginTop: '15px'
                },
                color: {
                    width: '100px',
                    height: '20px',
                    borderRadius: '3px',
                    background: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
                    cursor: 'pointer',
                    padding: '2.5px',
                },
                colorCode:{
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '5px 10px',
                    color: 'white',
                    fontSize: '12px',
                    borderRadius: '3px',
                    width: '135px',
                    textAlign: 'center',
                },
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
                        <span style={itemStyle.colorCode}>{`rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`}</span>
                    </div>
                    <div style={sketchStyle.container}>
                        {this.state.displayColorPicker ? 
                            <SketchPicker color={this.props.color} onChange={ this.handleChange } styles={sketchStyle}/>
                        : null}
                        <i className="bi bi-x-lg" title='Close' onClick={this.handleClose}></i>
                    </div>
                </div>
            </div>
        )
    }
}