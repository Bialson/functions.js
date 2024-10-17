import { Vector3 } from 'three';
import { AxisRange, SurfaceFormula } from './types';
import { evaluate } from 'mathjs';

export const extractMathFormula = (formula: string) => {
	const indexOfEqualSign = formula.indexOf('=');
	if (indexOfEqualSign !== -1) {
		return formula
			.substring(indexOfEqualSign + 1)
			.replace('$', '')
			.trim();
	}
	return formula.replace('$', '').trim();
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

	let x: number = u * (xRange.max - xRange.min) + xRange.min,
		y: number = v * (yRange.max - yRange.min) + yRange.min,
		z: number = 0;

	try {
		if (typeof formula === 'string') {
			z = evaluate(formula, { x: x, y: y, a: a, b: b });
		} else {
			x = evaluate(formula.parametric.x, { u: x, v: y, a: a, b: b });
			y = evaluate(formula.parametric.y, { u: x, v: y, a: a, b: b });
			z = evaluate(formula.parametric.z, { u: x, v: y, a: a, b: b });
		}
	} catch {
		z = 0;
	}

	if (isNaN(z)) {
		z = 0;
	}

	target.set(x, z, y);
};
