import React, { useEffect, useContext, useState, useRef } from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import { ThemeContext } from '../context/themeSwitcher';

const ColorPicker = (props) => {
	const theme = useContext(ThemeContext);
	const darkMode = theme.state.darkMode;
	const [color, changeColor] = useState({
		r: props.r,
		g: props.g,
		b: props.b,
		a: props.a,
	});
	const [displayColorPicker, handleChange] = useState(false);
	const showColorPicker = () => {
		handleChange(!displayColorPicker);
	};
	const changeCurrentColor = (color) => {
		changeColor(color.rgb);
	};
	const colorHex = useRef(null);
	const opacity = useRef(null);
	useEffect(() => {
		const colorToHex = (value) => {
			return value !== undefined
				? parseInt(value, 10).toString(16)
				: '00';
		};
		const hex =
			color.a !== '0'
				? colorToHex(color.r) +
				  colorToHex(color.g) +
				  colorToHex(color.b)
				: 'Transp';
		colorHex.current.value = hex.toUpperCase();
		opacity.current.value =
			color.a !== undefined ? color.a * 100 + '%' : '0%';
		props.setColor(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
	}, [color, props]);
	const sketchStyle = {
		default: {
			picker: {
				background: 'rgba(40, 40, 40, 0.75)',
			},
		},
		container: {
			postion: 'relative',
			display: displayColorPicker ? 'flex' : 'none',
			flexDirection: 'column',
		},
		dock: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			width: '216px',
		},
	};
	const itemStyle = reactCSS({
		default: {
			container: {
				width: '140px',
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'space-evenly',
				alignItems: 'center',
			},
			color: {
				width: '20px',
				height: '20px',
				borderRadius: '5px',
				background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
				cursor: 'pointer',
				padding: '2.5px',
			},
			colorCode: {
				background: `${
					darkMode
						? 'rgba(255, 255, 255, 0.12)'
						: 'rgba(40, 40, 40, 0.75)'
				}`,
				color: 'white',
				fontSize: '12px',
				borderRadius: '3px',
				border: 'none',
				width: '50px',
				textAlign: 'center',
			},
			opacity: {
				background: `${
					darkMode
						? 'rgba(255, 255, 255, 0.12)'
						: 'rgba(40, 40, 40, 0.75)'
				}`,
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
				flexWrap: 'wrap',
			},
		},
	});
	return (
		<div className="color-container">
			<div style={sketchStyle.dock}>
				<div className="settings-name">
					<span>{props.name}</span>
				</div>
				<div style={itemStyle.container}>
					<div
						style={itemStyle.color}
						onClick={showColorPicker}
						title="Open color box"
					></div>
					<input
						type="text"
						style={itemStyle.colorCode}
						ref={colorHex}
						defaultValue={'#'}
					/>
					<input
						type="text"
						style={itemStyle.opacity}
						ref={opacity}
						defaultValue={color.a * 100 + '%'}
					/>
				</div>
			</div>
			<div style={sketchStyle.container}>
				<SketchPicker
					color={color}
					onChange={changeCurrentColor}
					styles={sketchStyle}
				/>
			</div>
		</div>
	);
};

export default ColorPicker;
