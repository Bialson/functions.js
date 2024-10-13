import { Canvas } from '@react-three/fiber';
import { Ground } from './Ground';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { AxesHelper, GizmoHelper } from './helpers';

export const Scene: React.FC = () => {
	return (
		<Canvas className="z-0 absolute">
			<PerspectiveCamera
				makeDefault
				position={[5, 5, 10]}
				fov={75}
				near={0.1}
				far={1000}
				zoom={2}
			/>
			<Ground visible />
			<OrbitControls />
			<GizmoHelper />
			<AxesHelper visible />
		</Canvas>
	);
};
