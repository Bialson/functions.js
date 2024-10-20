import { Vector3 } from 'three';
import { AxisRange, SurfaceFormula } from './types';
import { evaluate } from 'mathjs';

export const extractMathFormula = (formula: string) => {
	const indexOfEqualSign = formula.indexOf('=');
	if (indexOfEqualSign !== -1) {
		return formula
			.substring(indexOfEqualSign + 1)
			.replace('$', '')
			.replace('{', '(')
			.replace('}', ')')
			.trim();
	}

	return formula
		.replaceAll('$', '')
		.replaceAll('{', '(')
		.replaceAll('}', ')')
		.trim();
};

type MeshFunctionArgs = {
	a: number;
	b: number;
	xRange: AxisRange;
	yRange: AxisRange;
	formula: SurfaceFormula;
};

export const meshFunction = (
	u: number,
	v: number,
	target: Vector3,
	args: MeshFunctionArgs,
) => {
	const { xRange, yRange, formula, a, b } = args;

	const xDiff = xRange.max - xRange.min;
	const yDiff = yRange.max - yRange.min;

	let x: number = 0,
		y: number = 0,
		z: number = 0;

	u = u * xDiff + xRange.min;
	v = v * yDiff + yRange.min;

	try {
		if (typeof formula === 'string') {
			x = u;
			y = v;
			z = evaluate(formula, { x: u, y: v, a: a, b: b });
		} else {
			x = evaluate(formula.parametric.x, { u: u, v: v, a: 4, b: b });
			y = evaluate(formula.parametric.y, { u: u, v: v, a: 4, b: b });
			z = evaluate(formula.parametric.z, { u: u, v: v, a: 4, b: b });
		}
	} catch {
		z = 0;
	}

	if (isNaN(z) || isNaN(x) || isNaN(y)) {
		return target.set(0, 0, 0);
	}

	target.set(x, z, y);
};
