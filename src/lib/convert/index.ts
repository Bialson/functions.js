import { Group, Object3DEventMap } from 'three';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';

export const convert = (
	scene: Group<Object3DEventMap> | null | undefined,
	convertMode: 'OBJ' | 'STL',
): Promise<string> => {
	return new Promise((resolve, reject) => {
		if (scene) {
			switch (convertMode) {
				case 'OBJ':
					// Convert to OBJ
					resolve(new OBJExporter().parse(scene));
					break;
				case 'STL':
					// Convert to STL
					resolve(new STLExporter().parse(scene));
					break;
				default:
					reject('Invalid convert mode');
			}
		}
		reject('No scene to convert');
	});
};
