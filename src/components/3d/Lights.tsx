import { Fragment } from 'react';
import { Vector3 } from 'three';

export const Lights = (): JSX.Element => {
	return (
		<Fragment>
			<pointLight position={new Vector3(0, 15, 0)} intensity={250} />
			<pointLight position={new Vector3(0, -15, 0)} intensity={250} />
			<pointLight position={new Vector3(15, 0, 0)} intensity={200} />
			<pointLight position={new Vector3(-15, 0, 0)} intensity={200} />
			<pointLight position={new Vector3(0, 0, 15)} intensity={200} />
			<pointLight position={new Vector3(0, 0, -15)} intensity={200} />
			<ambientLight intensity={0.2} />
		</Fragment>
	);
};
