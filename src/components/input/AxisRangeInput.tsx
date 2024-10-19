import { Slider } from '@/components/ui/slider';
import {
	Axis,
	MAX_AXIS_RANGE,
	MIN_AXIS_RANGE,
	RANGE_STEP,
} from '@/lib/math/types';
import { useDataStore } from '@/store/data';
import { ChangeEvent, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Label } from '@/components/ui/label';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import { useTranslations } from 'next-intl';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../ui/input';

type RangeBoundary = 'min' | 'max';

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

	const handleChange = useDebouncedCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const value = parseFloat(event.target.value);

			const boundary = event.target.dataset.boundary as RangeBoundary;

			if (boundary === 'min') {
				setAxisMin(axis, value);
			} else {
				setAxisMax(axis, value);
			}
		},
		150,
	);

	return (
		<div className="flex flex-col gap-4 items-center">
			<Label htmlFor={inputId} className="w-full">
				{t(axis)}
			</Label>
			{/* <Slider
				aria-label={`Set the range of ${axis}`}
				id={inputId}
				defaultValue={defaultValue}
				min={MIN_AXIS_RANGE}
				max={MAX_AXIS_RANGE}
				step={RANGE_STEP}
				onValueChange={handleChange}
			/> */}
			<div className="w-full flex flex-row justify-between">
				<Input
					data-boundary="min"
					type="number"
					defaultValue={defaultValue[0]}
					onChange={handleChange}
					min={MIN_AXIS_RANGE}
					max={0}
					className="w-1/2"
				/>
				<div className="w-full flex items-center justify-center">
					<Latex>{`$<= ${axis} <=$`}</Latex>
				</div>
				<Input
					data-boundary="max"
					type="number"
					defaultValue={defaultValue[1]}
					min={0}
					max={MAX_AXIS_RANGE}
					className="w-1/2"
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};
