import { Canvas, useFrame } from '@react-three/fiber';
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
import { RefObject, useEffect, useRef, useState } from 'react';
import { AxesHelper, GizmoHelper } from './helpers';
import { Plot } from './Plot';
import { Lights } from './Lights';
import { usePlotStore } from '@/store/plot';
import { useShallow } from 'zustand/react/shallow';
import { BarLoader } from 'react-spinners';

export const Scene: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);

	const [transformControlsMode] = usePlotStore(
		useShallow((state) => [state.transformControlsMode]),
	);

	// const orbitControlsRef = useRef<OrbitControlsType>(null);
	// const transformControlsRef = useRef<TransformControlsType>(null);

	const [orbitControls, setOrbitControls] =
		useState<OrbitControlsType | null>(null);

	const [transformControls, setTransformControls] =
		useState<TransformControlsType | null>(null);

	useEffect(() => {
		if (transformControls) {
			const controls = transformControls;

			const callback = (event: any) => {
				const orbit_controls = orbitControls;

				if (orbit_controls) {
					orbit_controls.enabled = !event.value;
					setOrbitControls(orbit_controls);
				}
			};
			controls.addEventListener('dragging-changed', callback);

			return () =>
				controls.removeEventListener('dragging-changed', callback);
		}
	});

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return isLoading ? (
		<div className="z-0 absolute w-full h-full flex items-center justify-center">
			<BarLoader
				speedMultiplier={1.5}
				color="#FFF"
				height={5}
				width={150}
				cssOverride={{
					borderRadius: '0.25rem',
				}}
			/>
		</div>
	) : (
		<Canvas className="z-0 absolute">
			<Lights />
			<PerspectiveCamera
				makeDefault
				position={[5, 10, 15]}
				fov={75}
				near={0.1}
				far={1000}
				zoom={1.5}
			/>
			<Ground visible />
			<OrbitControls ref={setOrbitControls} />
			<GizmoHelper />
			<AxesHelper visible />
			<TransformControls
				ref={setTransformControls}
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
