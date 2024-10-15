import { usePlotStore } from '@/store/plot';
import { useShallow } from 'zustand/react/shallow';
import { Slider } from '../ui/slider';

export const Opacity: React.FC = () => {
	const [opacity, setOpacity] = usePlotStore(
		useShallow((state) => [state.opacity, state.setOpacity]),
	);

	const handleChange = (value: number[]) => {
		setOpacity(value[0]);
	};

	return (
		<div>
			<Slider
				max={1}
				min={0}
				step={0.05}
				value={[opacity]}
				onValueChange={handleChange}
			/>
		</div>
	);
};
