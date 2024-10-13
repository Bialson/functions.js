import { ColorMap } from '@/assets/colors/colorMaps';
import { Color } from 'three';
import { create } from 'zustand';

export type TransformControls = 'move' | 'rotate' | 'scale';

type FillType = 'solid' | 'colormap';

interface PlotStore {
	transformControlsMode: TransformControls;
	surface: boolean;
	wireframe: boolean;
	surfaceColor: Color;
	materialURL: string | undefined;
	wireframeColor: Color;
	wireframeLinewidth: number;
	fillType: FillType;
	colorMap: ColorMap;
	gridHelper: boolean;
	axisHelper: boolean;
	opacity: number;
	setTransformControlsMode: (mode: TransformControls) => void;
	setSurfaceVisible: (surface: boolean) => void;
	setWireframeVisible: (wireframe: boolean) => void;
	setSurfaceColor: (color: string) => void;
	setMaterialURL: (url: string | undefined) => void;
	setWireframeColor: (color: string) => void;
	setWireframeLinewidth: (width: number) => void;
	setFillType: (type: FillType) => void;
	setColorMap: (colorMap: ColorMap) => void;
	setGridHelperVisible: (gridHelper: boolean) => void;
	setAxisHelperVisible: (axisHelper: boolean) => void;
	setOpacity: (opacity: number) => void;
}

export const usePlotStore = create<PlotStore>()((set) => ({
	transformControlsMode: 'move',
	surface: true,
	wireframe: false,
	surfaceColor: new Color('#ff0000'),
	materialURL: undefined,
	wireframeColor: new Color('#000000'),
	wireframeLinewidth: 1,
	fillType: 'solid',
	colorMap: 'jet',
	gridHelper: true,
	axisHelper: true,
	opacity: 1,
	setTransformControlsMode: (mode) =>
		set(() => ({ transformControlsMode: mode })),
	setSurfaceVisible: (surface) => set(() => ({ surface })),
	setWireframeVisible: (wireframe) => set(() => ({ wireframe })),
	setSurfaceColor: (color) => set(() => ({ surfaceColor: new Color(color) })),
	setMaterialURL: (url) => set(() => ({ materialURL: url })),
	setWireframeColor: (color) =>
		set(() => ({ wireframeColor: new Color(color) })),
	setWireframeLinewidth: (width) =>
		set(() => ({ wireframeLinewidth: width })),
	setFillType: (type) => set(() => ({ fillType: type })),
	setColorMap: (colorMap) => set(() => ({ colorMap })),
	setGridHelperVisible: (gridHelper) => set(() => ({ gridHelper })),
	setAxisHelperVisible: (axisHelper) => set(() => ({ axisHelper })),
	setOpacity: (opacity) => set(() => ({ opacity })),
}));
