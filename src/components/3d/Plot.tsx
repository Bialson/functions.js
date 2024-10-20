import { useParametricGeometry } from '@/hooks/useParametricGeometry';
import * as THREE from 'three';
import { useZClippingPlanes } from '@/hooks/uesZClippingPlanes';
import {
	Dispatch,
	SetStateAction,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useFrame } from '@react-three/fiber';
import { usePlotMaterial } from '@/hooks/usePlotMaterial';
import { usePlotStore } from '@/store/plot';
import { useShallow } from 'zustand/react/shallow';
import { Group } from 'three';

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
	const groupRef = useRef<Group>(null);

	const geometry = useParametricGeometry();

	const [meshPositionY, setMeshPositionY] = useState<number>(0);

	const zClippingPlanes = useZClippingPlanes(meshPositionY);

	const [surfaceMaterial, wireframeMaterial] =
		usePlotMaterial(zClippingPlanes);

	const [setGroupRef] = usePlotStore(
		useShallow((state) => [state.setGroupRef]),
	);

	const fixedScale = useMemo(() => {
		const boundingBox = geometry.boundingBox;

		if (boundingBox?.max.y) {
			if (boundingBox.max.y > 50) {
				return new THREE.Vector3(1, 0.1, 1);
			}

			if (boundingBox.max.y > 200) {
				return new THREE.Vector3(1, 0.05, 1);
			}
		}

		return new THREE.Vector3(1, 1, 1);
	}, [geometry]);

	useEffect(() => {
		setGroupRef(groupRef);
	}, [groupRef, setGroupRef]);

	useFrame(() => {
		const pos = new THREE.Vector3();
		meshRef?.getWorldPosition(pos);

		if (pos.y !== meshPositionY) {
			setMeshPositionY(pos.y);
		}
	});

	return (
		<group ref={groupRef}>
			<mesh
				ref={setMeshRef}
				geometry={geometry}
				scale={fixedScale}
				onAfterRender={(rendered) =>
					(rendered.localClippingEnabled = true)
				}
			>
				{surfaceMaterial}
			</mesh>
			<mesh
				geometry={geometry}
				scale={fixedScale}
				onAfterRender={(rendered) =>
					(rendered.localClippingEnabled = true)
				}
			>
				{wireframeMaterial}
			</mesh>
		</group>
	);
};
