import { useDataStore } from '@/store/data';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import * as THREE from 'three';

export const useZClippingPlanes = () => {
	const [zRange] = useDataStore(useShallow((state) => [state.zRange]));

	const zMinPlane = useMemo(() => {
		return new THREE.Plane(new THREE.Vector3(0, 1, 0), -zRange.min);
	}, [zRange.min]);

	const zMaxPlane = useMemo(() => {
		return new THREE.Plane(new THREE.Vector3(0, -1, 0), zRange.max);
	}, [zRange.max]);

	return [zMinPlane, zMaxPlane];
};
