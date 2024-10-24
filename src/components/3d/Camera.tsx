import { PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export const Camera: React.FC = () => {
	const { size } = useThree();
	const aspect = size.width / size.height;
	const near = 0.1 * aspect;
	const far = 500 * aspect;

	return (
		<PerspectiveCamera
			makeDefault
			near={near}
			far={far}
			position={[15, 10, 15]}
			zoom={1.5}
		/>
	);
};
