import { usePlotStore } from '@/store/plot';
import { useMemo } from 'react';
import * as THREE from 'three';
import { useShallow } from 'zustand/react/shallow';
import { useShaderMaterial } from '@/hooks/useShaderMaterial';
import { ParametricGeometry } from 'three-stdlib';

export const usePlotMaterial = (
	clippingPlanes: THREE.Plane[],
	geometry: ParametricGeometry,
) => {
	const [
		colorMap,
		surfaceColor,
		opacity,
		materialURL,
		displayMode,
		wireframeColor,
		wireframeLinewidth,
		fillType,
	] = usePlotStore(
		useShallow((state) => [
			state.colorMap,
			state.surfaceColor,
			state.opacity,
			state.materialURL,
			state.displayMode,
			state.wireframeColor,
			state.wireframeLinewidth,
			state.fillType,
		]),
	);

	const materialVisible = displayMode !== 'wireframe';
	const wireframeVisible = displayMode !== 'surface';

	const shaderMaterial = useShaderMaterial({
		colorMap,
		geometry,
		shaderMaterialProps: {
			clipping: true,
			clippingPlanes,
			opacity,
			visible: materialVisible,
		},
	});

	const meshMaterial = useMemo(() => {
		if (fillType === 'colormap' && colorMap) {
			return shaderMaterial;
		}
		if (materialURL) {
			const texture = new THREE.TextureLoader().load(materialURL);
			return (
				<meshStandardMaterial
					side={2}
					visible={materialVisible}
					map={texture}
					opacity={opacity}
					transparent
					clipShadows
					clippingPlanes={clippingPlanes}
				/>
			);
		}

		return (
			<meshStandardMaterial
				side={2}
				visible={materialVisible}
				color={surfaceColor}
				opacity={opacity}
				transparent
				clipShadows
				clippingPlanes={clippingPlanes}
			/>
		);
	}, [
		fillType,
		colorMap,
		shaderMaterial,
		surfaceColor,
		opacity,
		materialURL,
		materialVisible,
		clippingPlanes,
	]);

	const wireframeMaterial = useMemo(() => {
		return (
			<meshStandardMaterial
				side={2}
				visible={wireframeVisible}
				color={wireframeColor}
				transparent
				wireframe
				wireframeLinewidth={wireframeLinewidth}
				clipShadows
				clippingPlanes={clippingPlanes}
			/>
		);
	}, [wireframeVisible, wireframeColor, wireframeLinewidth, clippingPlanes]);

	return [meshMaterial, wireframeMaterial];
};
