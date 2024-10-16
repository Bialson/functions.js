import { usePlotStore } from '@/store/plot';
import { useShallow } from 'zustand/react/shallow';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { useTranslations } from 'next-intl';

export const Opacity: React.FC = () => {
	const t = useTranslations('toolbox.texture.opacity');

	const [opacity, setOpacity] = usePlotStore(
		useShallow((state) => [state.opacity, state.setOpacity]),
	);

	const handleSliderChange = (value: number[]) => {
		setOpacity(value[0]);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		if (!isNaN(value) && value >= 0 && value <= 100) {
			setOpacity(value / 100);
		} else if (value > 100) {
			setOpacity(1);
		} else {
			setOpacity(0);
		}
	};

	return (
		<div>
			<div className="flex flex-row justify-between items-center">
				<Label>{t('title')}</Label>
				<div className="flex rounded-md border border-input bg-background text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground">
					<input
						type="text"
						value={opacity * 100}
						maxLength={3}
						size={2}
						className="h-8 text-center rounded-md bg-background outline-none"
						onChange={handleInputChange}
					/>
					<span className="flex pr-2 items-center">%</span>
				</div>
			</div>
			<Slider
				className="mt-4"
				max={1}
				min={0}
				step={0.05}
				value={[opacity]}
				onValueChange={handleSliderChange}
			/>
		</div>
	);
};
