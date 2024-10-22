import { Color } from 'three';
import { GradientTexture } from '@react-three/drei';

const createGradientTexture = (colorMap: Color[], size: number = 1024) => {
	const stops = colorMap.map((_, i) => i / (colorMap.length - 1)); // Create stops ranging from 0 to 1
	const colors = colorMap.map((color) => `#${color.getHexString()}`); // Convert Color objects to hex strings

	return (
		<GradientTexture
			stops={stops}
			colors={colors}
			size={size} // Optional size property
		/>
	);
};

const createCSSGradient = (colorMap: Color[]) => {
	const stops = colorMap.map(
		(_, i) => `${(i / (colorMap.length - 1)) * 100}%`,
	);
	const colors = colorMap.map((color) => `#${color.getHexString()}`);
	return `linear-gradient(90deg, ${colors.map((color, i) => `${color} ${stops[i]}`).join(', ')})`;
};

export { createGradientTexture, createCSSGradient };
