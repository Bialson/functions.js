import { useParametricGeometry } from '@/hooks/useParametricGeometry';
import * as THREE from 'three';
import { useZClippingPlanes } from '@/hooks/uesZClippingPlanes';
import { Dispatch, SetStateAction, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePlotMaterial } from '@/hooks/usePlotMaterial';

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

	const [meshPositionY, setMeshPositionY] = useState<number>(0);

	const zClippingPlanes = useZClippingPlanes(meshPositionY);

	const [surfaceMaterial, wireframeMaterial] =
		usePlotMaterial(zClippingPlanes);

	useFrame(() => {
		const pos = new THREE.Vector3();
		meshRef?.getWorldPosition(pos);

		if (pos.y !== meshPositionY) {
			setMeshPositionY(pos.y);
		}
	});

	return (
		<group>
			<mesh
				ref={setMeshRef}
				geometry={geometry}
				onAfterRender={(rendered) =>
					(rendered.localClippingEnabled = true)
				}
			>
				{surfaceMaterial}
			</mesh>
			<mesh
				geometry={geometry}
				onAfterRender={(rendered) =>
					(rendered.localClippingEnabled = true)
				}
			>
				{wireframeMaterial}
			</mesh>
		</group>
	);
};
