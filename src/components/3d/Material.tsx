import { usePlotStore } from '@/store/plot';
import { useMemo } from 'react';
import { TextureLoader } from 'three';

export const Material: React.FC = () => {
	const [surfaceColor, opacity, materialURL, displayMode] = usePlotStore(
		(state) => [
			state.surfaceColor,
			state.opacity,
			state.materialURL,
			state.displayMode,
		],
	);

	const materialVisible = useMemo(
		() => displayMode !== 'wireframe',
		[displayMode],
	);

	const meshMaterial = useMemo(() => {
		if (materialURL) {
			const texture = new TextureLoader().load(materialURL);
			return (
				<meshStandardMaterial
					side={2}
					visible={materialVisible}
					map={texture}
					opacity={opacity}
					transparent
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
			/>
		);
	}, [surfaceColor, opacity, materialURL, materialVisible]);

	return meshMaterial;
};
