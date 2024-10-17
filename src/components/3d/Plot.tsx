import { useParametricGeometry } from '@/hooks/useParametricGeometry';
import { usePlotStore } from '@/store/plot';
import { useShallow } from 'zustand/react/shallow';
import * as THREE from 'three';
import { useZClippingPlanes } from '@/hooks/uesZClippingPlanes';

export const Plot: React.FC = () => {
	const geometry = useParametricGeometry();

	const zClippingPlanes = useZClippingPlanes();

	const [surfaceColor, opacity] = usePlotStore(
		useShallow((state) => [state.surfaceColor, state.opacity]),
	);
	return (
		<mesh
			geometry={geometry}
			position={[0, 0, 0]}
			onAfterRender={(rendered) => (rendered.localClippingEnabled = true)}
		>
			<meshStandardMaterial
				side={THREE.DoubleSide}
				color={surfaceColor}
				opacity={opacity}
				transparent={true}
				clippingPlanes={zClippingPlanes}
				clipShadows
			/>
		</mesh>
	);
};
