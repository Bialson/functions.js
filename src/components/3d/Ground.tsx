import { Grid } from '@react-three/drei';

const gridConfig = {
	cellSize: 0.5,
	cellThickness: 0.5,
	cellColor: '#6f6f6f',
	sectionSize: 3,
	sectionThickness: 1,
	sectionColor: '#3182ce',
	fadeDistance: 120,
	fadeStrength: 1,
	followCamera: false,
	infiniteGrid: true,
};

export const Ground = ({ visible }: { visible?: boolean }) => (
	<Grid
		position={[0, 0, 0]}
		args={[10.5, 10.5]}
		{...gridConfig}
		side={2}
		visible={visible}
	/>
);
