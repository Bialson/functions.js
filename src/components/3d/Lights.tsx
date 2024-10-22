import { Fragment } from 'react';
import { Vector3 } from 'three';

export const Lights = (): JSX.Element => {
	return (
		<Fragment>
			<directionalLight
				position={new Vector3(10, 20, 10)}
				intensity={1.5}
				castShadow
			/>

			<pointLight position={new Vector3(-10, 10, -10)} intensity={0.8} />
			<pointLight position={new Vector3(10, -10, 10)} intensity={0.6} />

			<pointLight position={new Vector3(0, 0, -15)} intensity={0.5} />

			<ambientLight intensity={1} />
		</Fragment>
	);
};
