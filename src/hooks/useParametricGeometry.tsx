import { extractMathFormula, meshFunction } from '@/lib/math';
import { SurfaceFormula } from '@/lib/math/types';
import { useDataStore } from '@/store/data';
import { useFormulaStore } from '@/store/formula';
import { usePlotStore } from '@/store/plot';
import { useMemo } from 'react';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { useShallow } from 'zustand/react/shallow';

export const useParametricGeometry = () => {
	const [xRange, yRange, a, b] = useDataStore(
		useShallow((state) => [
			state.xRange,
			state.yRange,
			state.aParam,
			state.bParam,
		]),
	);

	const [plotType] = usePlotStore(useShallow((state) => [state.plotType]));

	const [equation, equationX, equationY, equationZ] = useFormulaStore(
		useShallow((state) => [
			state.equation,
			state.equationX,
			state.equationY,
			state.equationZ,
		]),
	);

	const parametricGeometry = useMemo(() => {
		const formula: SurfaceFormula =
			plotType === 'parametric'
				? {
						parametric: {
							x: extractMathFormula(equationX),
							y: extractMathFormula(equationY),
							z: extractMathFormula(equationZ),
						},
					}
				: extractMathFormula(equation);

		const geometry = new ParametricGeometry(
			(u, v, target) =>
				meshFunction(u, v, target, {
					a: a,
					b: b,
					formula: formula,
					xRange: xRange,
					yRange: yRange,
				}),
			50,
			50,
		);

		geometry.computeBoundingBox();
		geometry.computeVertexNormals();

		return geometry;
	}, [
		a,
		b,
		equation,
		equationX,
		equationY,
		equationZ,
		plotType,
		xRange,
		yRange,
	]);

	return parametricGeometry;
};
