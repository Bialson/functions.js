import { AxisRange } from '@/lib/math/types';

export type LibraryAsset = {
	title: string;
	equation?: string;
	previewImageUrl: string;
	parametric?: {
		x: string;
		y: string;
		z: string;
	};
	xRange: AxisRange;
	yRange: AxisRange;
};
