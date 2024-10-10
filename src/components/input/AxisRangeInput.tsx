import { Slider } from '@/components/ui/slider';
import {
	Axis,
	MAX_AXIS_RANGE,
	MIN_AXIS_RANGE,
	RANGE_STEP,
} from '@/lib/math/types';
import { useDataStore } from '@/store/data';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Label } from '@/components/ui/label';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import { useTranslations } from 'next-intl';

type AxisRangeInputProps = {
	axis: Axis;
};

export const AxisRangeInput: React.FC<AxisRangeInputProps> = ({ axis }) => {
	const t = useTranslations('math.axisRanges');

	const [xRange, yRange, zRange] = useDataStore(
		useShallow((state) => [state.xRange, state.yRange, state.zRange]),
	);

	const [setAxisMin, setAxisMax] = useDataStore(
		useShallow((state) => [state.setAxisMin, state.setAxisMax]),
	);

	const inputId = `axis-${axis}-range`;

	const defaultValue = useMemo(() => {
		if (axis === 'x') {
			return [xRange.min, xRange.max];
		} else if (axis === 'y') {
			return [yRange.min, yRange.max];
		} else {
			return [zRange.min, zRange.max];
		}
	}, [axis, xRange, yRange, zRange]);

	const handleChange = (value: number[]) => {
		const [min, max] = value;
		if (min !== defaultValue[0]) {
			setAxisMin(axis, min);
		}

		if (max !== defaultValue[1]) {
			setAxisMax(axis, max);
		}
	};

	return (
		<div className="flex flex-col gap-4 items-center">
			<Label htmlFor={inputId} className="w-full">
				{t(axis)}
			</Label>
			<Slider
				aria-label={`Set the range of ${axis}`}
				id={inputId}
				defaultValue={defaultValue}
				min={MIN_AXIS_RANGE}
				max={MAX_AXIS_RANGE}
				step={RANGE_STEP}
				onValueChange={handleChange}
			/>
			<Latex>{`$${defaultValue[0]} <= ${axis} <= ${defaultValue[1]}$`}</Latex>
		</div>
	);
};
