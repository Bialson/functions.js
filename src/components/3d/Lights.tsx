import { Vector3 } from 'three';

export const Lights = (): JSX.Element => {
	return (
		<>
			<pointLight position={new Vector3(0, 20, 0)} intensity={200} />
			<pointLight position={new Vector3(0, -20, 0)} intensity={200} />
			<pointLight position={new Vector3(-15, 5, -15)} intensity={100} />
			<pointLight position={new Vector3(15, 5, 15)} intensity={100} />
			<pointLight position={new Vector3(15, 5, -15)} intensity={100} />
			<pointLight position={new Vector3(-15, 5, 15)} intensity={100} />
			<ambientLight intensity={0.2} />
		</>
	);
};
