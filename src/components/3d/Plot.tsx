import { usePlotStore } from '@/store/plot';
import { useShallow } from 'zustand/react/shallow';

export const Plot: React.FC = () => {
	const [surfaceColor, opacity] = usePlotStore(
		useShallow((state) => [state.surfaceColor, state.opacity]),
	);

	return (
		<mesh>
			<boxGeometry attach="geometry" args={[1, 1, 1]} />
			<meshStandardMaterial
				side={2}
				color={surfaceColor}
				opacity={opacity}
				transparent
			/>
		</mesh>
	);
};
