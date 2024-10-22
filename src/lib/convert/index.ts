import { Group, Mesh, Object3DEventMap } from 'three';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';

class CSVExporter {
	parse(scene: Group<Object3DEventMap>): string {
		const geometry = (scene.children[0] as Mesh)?.geometry;

		if (!geometry.hasAttribute('position')) {
			console.error('No position data found in mesh.');
			return '';
		}

		const positions = geometry.attributes.position.array;
		let csvContent = 'x,y,z\n'; // CSV header

		// Loop through position data and format it as CSV
		for (let i = 0; i < positions.length; i += 3) {
			const x = positions[i];
			const y = positions[i + 1];
			const z = positions[i + 2];
			csvContent += `${x},${y},${z}\n`;
		}

		return csvContent;
	}
}

export const convert = (
	scene: Group<Object3DEventMap> | null | undefined,
	convertMode: 'OBJ' | 'STL' | 'CSV',
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
				case 'CSV':
					// Convert to CSV
					resolve(new CSVExporter().parse(scene));
					break;
				default:
					reject('Invalid convert mode');
			}
		}
		reject('No scene to convert');
	});
};
