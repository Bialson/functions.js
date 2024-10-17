import { useParametricGeometry } from '@/hooks/useParametricGeometry';
import { usePlotStore } from '@/store/plot';
import { useShallow } from 'zustand/react/shallow';
import * as THREE from 'three';
import { useZClippingPlanes } from '@/hooks/uesZClippingPlanes';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type PlotProps = {
	meshRef: THREE.Mesh<
		THREE.BufferGeometry<THREE.NormalBufferAttributes>,
		THREE.Material | THREE.Material[],
		THREE.Object3DEventMap
	> | null;
	setMeshRef: Dispatch<
		SetStateAction<THREE.Mesh<
			THREE.BufferGeometry<THREE.NormalBufferAttributes>,
			THREE.Material | THREE.Material[],
			THREE.Object3DEventMap
		> | null>
	>;
};

export const Plot: React.FC<PlotProps> = ({ meshRef, setMeshRef }) => {
	const geometry = useParametricGeometry();

	const zClippingPlanes = useZClippingPlanes();

	const [surfaceColor, opacity] = usePlotStore(
		useShallow((state) => [state.surfaceColor, state.opacity]),
	);

	useFrame(() => {
		const pos = new THREE.Vector3();
		console.log(meshRef?.getWorldPosition(pos));
	});

	return (
		<mesh
			ref={setMeshRef}
			geometry={geometry}
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
