import { Canvas } from '@react-three/fiber';
import { Ground } from './Ground';
import {
	OrbitControls,
	PerspectiveCamera,
	TransformControls,
} from '@react-three/drei';
import {
	OrbitControls as OrbitControlsType,
	TransformControls as TransformControlsType,
} from 'three-stdlib';
import { useEffect, useRef } from 'react';
import { AxesHelper, GizmoHelper } from './helpers';
import { Plot } from './Plot';
import { Lights } from './Lights';
import { usePlotStore } from '@/store/plot';
import { useShallow } from 'zustand/react/shallow';

export const Scene: React.FC = () => {
	const [transformControlsMode] = usePlotStore(
		useShallow((state) => [state.transformControlsMode]),
	);

	const orbitControlsRef = useRef<OrbitControlsType>(null);
	const transformControlsRef = useRef<TransformControlsType>(null);

	useEffect(() => {
		if (transformControlsRef.current) {
			const controls = transformControlsRef.current;
			const callback = (event: any) => {
				if (orbitControlsRef.current) {
					orbitControlsRef.current.enabled = !event.value;
				}
			};
			controls.addEventListener('dragging-changed', callback);
			return () =>
				controls.removeEventListener('dragging-changed', callback);
		}
	});

	return (
		<Canvas className="z-0 absolute">
			<Lights />
			<PerspectiveCamera
				makeDefault
				position={[5, 5, 10]}
				fov={75}
				near={0.1}
				far={1000}
				zoom={2}
			/>
			<Ground visible />
			<OrbitControls ref={orbitControlsRef} />
			<GizmoHelper />
			<AxesHelper visible />
			<TransformControls
				ref={transformControlsRef}
				mode={transformControlsMode}
				showX
				showY
				showZ
				translationSnap={0.1}
				scaleSnap={0.1}
			>
				<Plot />
			</TransformControls>
		</Canvas>
	);
};
