import { Color } from 'three';

type ColorMaps =
	| 'jet'
	| 'hot'
	| 'cool'
	| 'spring'
	| 'summer'
	| 'autumn'
	| 'winter'
	| 'bone'
	| 'copper'
	| 'greys'
	| 'yIGnBu';

export type ColorMap = ColorMaps[number];

type ColorMapValue = {
	[key in ColorMap]: Color[];
};

const createColorMap = (colors: string[]): Color[] =>
	colors.map((color) => new Color(color));

export const COLOR_MAPS: ColorMapValue = {
	jet: createColorMap([
		'#00007F',
		'#0000FF',
		'#007FFF',
		'#00FFFF',
		'#7FFF7F',
		'#FFFF00',
		'#FF7F00',
		'#FF0000',
		'#7F0000',
	]),
	hot: createColorMap([
		'#000000',
		'#800000',
		'#FF0000',
		'#FF8000',
		'#FFFF00',
		'#FFFF80',
		'#FFFFFF',
	]),
	cool: createColorMap(['#00FFFF', '#0000FF']),
	spring: createColorMap(['#FF00FF', '#FFFF00']),
	summer: createColorMap(['#008066', '#FFFF66']),
	autumn: createColorMap(['#FF0000', '#FFFF00']),
	winter: createColorMap(['#0000FF', '#008066']),
	bone: createColorMap(['#000000', '#545454', '#A6A6A6', '#FFFFFF']),
	copper: createColorMap(['#000000', '#FF6600', '#FFFFCC']),
	greys: createColorMap(['#DA321F', '#A6A6A6']),
	yIGnBu: createColorMap([
		'#FFFFD9',
		'#EDF8B1',
		'#C7E9B4',
		'#7FCDBB',
		'#41B6C4',
		'#1D91C0',
	]),
} as const;
