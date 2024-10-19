import { usePlotStore } from '@/store/plot';
import { useMemo } from 'react';
import * as THREE from 'three';
import { useShallow } from 'zustand/react/shallow';

export const usePlotMaterial = (clippingPlanes: THREE.Plane[]) => {
	const [
		surfaceColor,
		opacity,
		materialURL,
		displayMode,
		wireframeColor,
		wireframeLinewidth,
	] = usePlotStore(
		useShallow((state) => [
			state.surfaceColor,
			state.opacity,
			state.materialURL,
			state.displayMode,
			state.wireframeColor,
			state.wireframeLinewidth,
		]),
	);

	const materialVisible = displayMode !== 'wireframe';
	const wireframeVisible = displayMode !== 'surface';

	const meshMaterial = useMemo(() => {
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
	}, [surfaceColor, opacity, materialURL, materialVisible, clippingPlanes]);

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
