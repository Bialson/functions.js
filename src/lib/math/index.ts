import { Vector3 } from 'three';
import { AxisRange, SurfaceFormula } from './types';
import { evaluate } from 'mathjs';

export const extractMathFormula = (formula: string) => {
	const indexOfEqualSign = formula.indexOf('=');
	if (indexOfEqualSign !== -1) {
		return formula.substring(indexOfEqualSign + 1);
	}
	return formula;
};

type MeshFunctionArgs = {
	xRange: AxisRange;
	yRange: AxisRange;
	zRange: AxisRange;
	formula: SurfaceFormula;
};

export const meshFunction = (
	u: number,
	v: number,
	target: Vector3,
	args: MeshFunctionArgs,
) => {
	const { xRange, yRange, zRange, formula } = args;

	u = u * xRange.max + xRange.min;
	v = v * yRange.min + yRange.min;

	let z: number = 0;

	try {
		if (typeof formula === 'string') {
			z = evaluate(formula, { x: u, y: v });
		} else {
			u = evaluate(formula.parametric.x, { x: u, y: v });
			v = evaluate(formula.parametric.y, { x: u, y: v });
			z = evaluate(formula.parametric.z, { x: u, y: v });
		}
	} catch {
		z = 0;
	}

	if (isNaN(z)) {
		z = 0;
	}

	target.set(u, z, v);
};
