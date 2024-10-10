type Axis = 'x' | 'y' | 'z';

type AxisRange = {
	min: number;
	max: number;
};

const MAX_AXIS_RANGE = 10;
const MIN_AXIS_RANGE = -10;
const RANGE_STEP = 0.5;

export type { Axis, AxisRange };
export { MIN_AXIS_RANGE, MAX_AXIS_RANGE, RANGE_STEP };
