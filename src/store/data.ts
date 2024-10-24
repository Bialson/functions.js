import { create } from 'zustand';

type Axis = 'x' | 'y' | 'z';

type AxisRange = {
	min: number;
	max: number;
};

interface DataState {
	xRange: AxisRange;
	yRange: AxisRange;
	zRange: AxisRange;
	aParam: number;
	bParam: number;
	setAxisMin: (axis: Axis, value: number) => void;
	setAxisMax: (axis: Axis, value: number) => void;
	setParam: (param: 'a' | 'b', value: number) => void;
}

export const useDataStore = create<DataState>((set) => ({
	xRange: { min: -5, max: 5 },
	yRange: { min: -5, max: 5 },
	zRange: { min: -10, max: 10 },
	aParam: 1,
	bParam: 1,
	setAxisMin: (axis, value) => {
		if (axis === 'x') {
			set((state) => ({
				xRange: { ...state.xRange, min: value },
			}));
		} else if (axis === 'y') {
			set((state) => ({
				yRange: { ...state.yRange, min: value },
			}));
		} else if (axis === 'z') {
			set((state) => ({
				zRange: { ...state.zRange, min: value },
			}));
		}
	},
	setAxisMax: (axis, value) => {
		if (axis === 'x') {
			set((state) => ({
				xRange: { ...state.xRange, max: value },
			}));
		} else if (axis === 'y') {
			set((state) => ({
				yRange: { ...state.yRange, max: value },
			}));
		} else if (axis === 'z') {
			set((state) => ({
				zRange: { ...state.zRange, max: value },
			}));
		}
	},
	setParam: (param, value) => {
		if (param === 'a') {
			set({ aParam: value });
		} else if (param === 'b') {
			set({ bParam: value });
		}
	},
}));
