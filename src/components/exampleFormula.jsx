import { useContext } from 'react';
import TeX from '@matejmazur/react-katex';
import { MathExampleFormula } from './formula';

const ExampleFormula = (props) => {
	const { setGlobalFormula } = useContext(MathExampleFormula);
	const handleGlobalFormula = () => {
		setGlobalFormula(props.formula);
		document.querySelector('.formula_input').value += props.formula;
	};
	return (
		<div className="templt_func_item" onClick={handleGlobalFormula}>
			<TeX
				className="output"
				settings={{ macros: { '*': String.raw`\cdot` } }}
				math={props.formula}
			></TeX>
			{props.tex}
		</div>
	);
};

export default ExampleFormula;
