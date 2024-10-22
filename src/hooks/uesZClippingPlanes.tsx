import { useDataStore } from '@/store/data';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import * as THREE from 'three';

export const useZClippingPlanes = (zTranslation: number) => {
	const [zRange] = useDataStore(useShallow((state) => [state.zRange]));

	const zMinPlane = useMemo(() => {
		return new THREE.Plane(
			new THREE.Vector3(0, 1, 0),
			-zRange.min - zTranslation,
		);
	}, [zRange.min, zTranslation]);

	const zMaxPlane = useMemo(() => {
		return new THREE.Plane(
			new THREE.Vector3(0, -1, 0),
			zRange.max + zTranslation,
		);
	}, [zRange.max, zTranslation]);

	return [zMinPlane, zMaxPlane];
};
