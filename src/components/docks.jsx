import React, {
	useRef,
	useState,
	useEffect,
	useContext,
} from 'react';
import Plotly from 'plotly.js/dist/plotly.js';
import TeX from '@matejmazur/react-katex';
import ColorPicker from './ColorPicker';
import { ThemeContext } from '../context/themeSwitcher';
import { PlotState } from '../context/plotState';

const Material = () => {
	const { setPlot } = useContext(PlotState);
	const [bgColor, setBgColor] = useState('rgba()');
	const [axisColor, setAxisColor] = useState('rgba()');
	const [meshColor, setMeshColor] = useState('rgba()');
	const [colorMap, setColorMap] = useState('Jet');
	const [opacity, setOpacity] = useState(1);
	useEffect(() => {
		let cont = document.querySelector('.chart-container');
		cont.style.backgroundColor = `${bgColor}`;
		setPlot((prev) => ({
			...prev,
			data: [
				{
					...prev.data[0],
					colorscale: colorMap,
					opacity: opacity,
					colorbar: {
						...prev.data[0].colorbar,
						tickfont: {
							...prev.data[0].colorbar.tickfont,
							color: axisColor,
						},
					},
					contours: {
						...prev.data[0].contours,
						x: {
							...prev.data[0].contours.x,
							color: meshColor,
						},
						y: {
							...prev.data[0].contours.y,
							color: meshColor,
						},
						z: {
							...prev.data[0].contours.z,
							color: meshColor,
						},
					},
				},
			],
			layout: {
				...prev.layout,
				scene: {
					...prev.layout.scene,
					xaxis: {
						...prev.layout.scene.xaxis,
						color: axisColor,
						gridcolor: axisColor,
						tickfont: {
							color: axisColor,
						},
						title: {
							font: {
								color: axisColor,
							},
						},
					},
					yaxis: {
						...prev.layout.scene.yaxis,
						color: axisColor,
						gridcolor: axisColor,
						tickfont: {
							color: axisColor,
						},
						title: {
							font: {
								color: axisColor,
							},
						},
					},
					zaxis: {
						...prev.layout.scene.zaxis,
						color: axisColor,
						gridcolor: axisColor,
						tickfont: {
							color: axisColor,
						},
						title: {
							font: {
								color: axisColor,
							},
						},
					},
				},
			},
			revision: prev.revision + 1,
		}));
	}, [bgColor, axisColor, colorMap, meshColor, opacity, setPlot]);
	return (
		<>
			<ColorPicker
				setColor={(color) => setBgColor(color)}
				name="Background"
				r="26"
				g="38"
				b="59"
				a="1"
			/>
			<ColorPicker
				setColor={(color) => setAxisColor(color)}
				name="Axis"
				r="255"
				g="255"
				b="255"
				a="1"
			/>
			<ColorPicker
				setColor={(color) => setMeshColor(color)}
				name="Mesh"
				r="0"
				g="0"
				b="0"
				a="1"
			/>
			<div className="input-item">
				<span className="settings-name">Colorscale</span>
				<select
					className="colormaps"
					onChange={(event) => setColorMap(event.target.value)}
				>
					<option>Jet</option>
					<option>YlOrRd</option>
					<option
						value={[
							['0.0', 'rgb(165,0,38)'],
							['0.111111111111', 'rgb(215,48,39)'],
							['0.222222222222', 'rgb(244,109,67)'],
							['0.333333333333', 'rgb(253,174,97)'],
							['0.444444444444', 'rgb(254,224,144)'],
							['0.555555555556', 'rgb(224,243,248)'],
							['0.666666666667', 'rgb(171,217,233)'],
							['0.777777777778', 'rgb(116,173,209)'],
							['0.888888888889', 'rgb(69,117,180)'],
							['1.0', 'rgb(49,54,149)'],
						]}
					>
						Heat
					</option>
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
			<div className="input-item">
				<span className="settings-name">Opacity</span>
				<input
					type="range"
					defaultValue={100}
					className="opacity-range"
					step={1}
					min={0}
					max={100}
					onChange={(event) => setOpacity(event.target.value / 100)}
				></input>
			</div>
		</>
	);
};

const Layout = () => {
	const theme = useContext(ThemeContext);
	const darkMode = theme.state.darkMode;
	const [axis, showAxis] = useState(true);
	const [mesh, showMesh] = useState(false);
	const [surface, showSurface] = useState(true);
	const { setPlot } = useContext(PlotState);
	useEffect(() => {
		setPlot((prev) => ({
			...prev,
			data: [
				{
					...prev.data[0],
					hidesurface: !surface,
					contours: {
						x: {
							...prev.data[0].contours.x,
							show: mesh,
						},
						y: {
							...prev.data[0].contours.x,
							show: mesh,
						},
						z: {
							...prev.data[0].contours.x,
							show: mesh,
						},
					},
				},
			],
			layout: {
				...prev.layout,
				scene: {
					...prev.layout.scene,
					xaxis: {
						...prev.layout.scene.xaxis,
						showgrid: axis,
						showticklabels: axis,
						zeroline: axis,
					},
					yaxis: {
						...prev.layout.scene.yaxis,
						showgrid: axis,
						showticklabels: axis,
						zeroline: axis,
					},
					zaxis: {
						...prev.layout.scene.zaxis,
						showgrid: axis,
						showticklabels: axis,
						zeroline: axis,
					},
				},
			},
			revision: prev.revision + 1,
		}));
	}, [axis, mesh, surface, setPlot]);
	return (
		<div className="input-container">
			<div className="input-item">
				<span className="settings-name">Axis</span>
				<input
					type="checkbox"
					className={`checkbox-settings ${
						darkMode
							? 'checkbox-settings-dark'
							: 'checkbox-settings-light'
					}`}
					defaultChecked
					onChange={() => showAxis((current) => !current)}
				/>
			</div>
			<div className="input-item">
				<span className="settings-name">Mesh</span>
				<input
					type="checkbox"
					className={`checkbox-settings ${
						darkMode
							? 'checkbox-settings-dark'
							: 'checkbox-settings-light'
					}`}
					onChange={() => showMesh((current) => !current)}
				/>
			</div>
			<div className="input-item">
				<span className="settings-name">Surface</span>
				<input
					type="checkbox"
					className={`checkbox-settings ${
						darkMode
							? 'checkbox-settings-dark'
							: 'checkbox-settings-light'
					}`}
					onChange={() => showSurface((current) => !current)}
					defaultChecked
				/>
			</div>
		</div>
	);
};

const MathOps = () => {
	const { setPlot } = useContext(PlotState);
	const [plotTitle, changePlotTitle] = useState('f(x,y) =  0');
	const [mathConvFormula, setMathConvFormula] = useState('0');
	const [xRange, setXRange] = useState({ min: -1, max: 1 });
	const [yRange, setYRange] = useState({ min: -1, max: 1 });
	const generateRangeData = (start, end, step) => {
		let arr = [];
		for (let i = start; i <= end; i += step) {
			arr.push(i);
		}
		return arr;
	};
	const changeXDomain = (event) => {
		console.log(event.target.name);
		let value = parseInt(event.target.value, 10);
		switch (event.target.name) {
			case 'min':
				setXRange({ min: value, max: xRange.max });
				break;
			case 'max':
				setXRange({ min: xRange.min, max: value });
				break;
			default:
				break;
		}
	};
	const changeYDomain = (event) => {
		console.log(event.target.name);
		let value = parseInt(event.target.value, 10);
		switch (event.target.name) {
			case 'min':
				setYRange({ min: value, max: yRange.max });
				break;
			case 'max':
				setYRange({ min: yRange.min, max: value });
				break;
			default:
				break;
		}
	};
	const handleChange = (event) => {
		changePlotTitle(event.target.value);
		let formula = event.target.value;
		formula = formula
			.replace(/\^/g, '**')
			.replace(/e/g, 'Math.E')
			.replace('f(x, y) = ', '')
			.replace(/\\frac\{(.+?)\}\{(.+?)\}/g, '($1)/($2)')
			.replace(/\\sqrt\{(.+?)\}/g, 'Math.sqrt($1)')
			.replace(/\\sqrt\[3\]\{(.+?)\}/g, 'Math.cbrt($1)')
			.replace(/\{(.+?)\}/g, '($1)')
			.replace(/\|(.+?)\|/g, 'Math.abs($1)')
			.replace(/\b\w*sin\w*\((.+?)\)/g, 'Math.sin($1)')
			.replace(/\b\w*cos\w*\((.+?)\)/g, 'Math.cos($1)')
			.replace(/\b\w*tg\w*\((.+?)\)/g, 'Math.tan($1)');
		setMathConvFormula(formula);
	};
	useEffect(() => {
		let X = generateRangeData(xRange.min, xRange.max, 0.2);
		let Y = generateRangeData(yRange.min, yRange.max, 0.2);
		let Z = [];
		if (mathConvFormula !== '') {
			Z = X.map((x) => {
				return Y.map((y) => {
					try {
						return eval(mathConvFormula);
					} catch (e) {
						return 0;
					}
				});
			});
			setPlot((prev) => ({
				...prev,
				data: [
					{
						...prev.data[0],
						x: X,
						y: Y,
						z: Z,
					},
				],
				layout: {
					...prev.layout,
					datarevision: prev.datarevision + 1,
				},
				revision: prev.revision + 1,
			}));
			console.log(mathConvFormula);
		}
	}, [xRange, yRange, mathConvFormula, setPlot]);
	return (
		<>
			<div className="input-container">
				<div className="input-item">
					<span className="settings-name">Formula</span>
					<input
						type="search"
						className="input formula_input"
						placeholder="f(x, y) = ..."
						defaultValue="f(x, y) = 0"
						onChange={handleChange}
					/>
				</div>
				<br />
				<TeX
					className="output-sidebar"
					settings={{ macros: { '*': String.raw`\cdot` } }}
				>
					{plotTitle}
				</TeX>
				<br />
				<br />
				<br />
				<span className="settings-name">Domain</span>
				<div className="input-item">
					<span className="settings-name">
						<i>
							<TeX>x</TeX>
						</i>
					</span>
					<input
						type="number"
						className="input"
						defaultValue={-1}
						onChange={changeXDomain}
						name="min"
					/>
					<hr />
					<input
						type="number"
						className="input"
						defaultValue={1}
						onChange={changeXDomain}
						name="max"
					/>
				</div>
				<div className="input-item">
					<span className="settings-name">
						<i>
							<TeX>y</TeX>
						</i>
					</span>
					<input
						type="number"
						className="input"
						defaultValue={-1}
						onChange={changeYDomain}
						name="min"
					/>
					<hr />
					<input
						type="number"
						className="input"
						defaultValue={1}
						onChange={changeYDomain}
						name="max"
					/>
				</div>
			</div>
			<div className="math-analyze"></div>
		</>
	);
};

const Export = () => {
	const [format, changeFormat] = useState('svg');
	const plotImgRef = useRef(null);
	const downloadImage = () => {
		const div = document.querySelector('.js-plotly-plot');
		Plotly.downloadImage(div, { format: format, filename: 'plot' });
	};
	const generateImage = async () => {
		let div = document.querySelector('.js-plotly-plot');
		const url = await Plotly.toImage(div, { format: 'svg' });
		plotImgRef.current.src = url;
	};
	useEffect(() => {
		generateImage();
	}, []);
	return (
		<div className="input-container">
			<div className="input-item">
				<span className="settings-name">Format</span>
				<div className="formats">
					<input
						type="radio"
						value="svg"
						name="format"
						onClick={() => changeFormat('svg')}
						defaultChecked
					/>{' '}
					.svg
					<input
						type="radio"
						value="png"
						name="format"
						onClick={() => changeFormat('png')}
					/>{' '}
					.png
					<input
						type="radio"
						value="jpg"
						name="format"
						onClick={() => changeFormat('jpg')}
					/>{' '}
					.jpg
				</div>
			</div>
			<img
				ref={plotImgRef}
				alt="Export previev"
				width={216}
				title="Plot preview"
			/>
			<div className="input-item">
				<input
					type="submit"
					className="downloadImgBtn"
					value="Generate"
					onClick={() => {
						generateImage();
					}}
					title="Download image"
				/>
				<input
					type="submit"
					className="downloadImgBtn"
					value="Download"
					onClick={() => downloadImage()}
					title="Download image"
				/>
			</div>
		</div>
	);
};

export { Material, Layout, MathOps, Export };
