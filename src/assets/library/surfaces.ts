import { LibraryAsset } from '@/lib/assets/types';

export const LIBRARY_ASSETS: LibraryAsset[] = [
	{
		title: 'Peaks Function',
		equation:
			'3(1 - x)^2 * e^(-x^2 - (y+1)^2) - 10((x/5) - x^3 - y^5) * e^(-x^2 - y^2) - (1/3) * e^{-(x+1)^2 - y^2}',
		previewImageUrl: 'path/to/peaks_function_image',
		xRange: { min: -3, max: 3 },
		yRange: { min: -3, max: 3 },
	},
	{
		title: 'Saddle Surface',
		equation: 'x^2 - y^2',
		previewImageUrl: 'path/to/saddle_surface_image',
		xRange: { min: -2, max: 2 },
		yRange: { min: -2, max: 2 },
	},
	{
		title: 'Sinusoidal Surface',
		equation: 'sin(x) * sin(y)',
		previewImageUrl: 'path/to/sinusoidal_surface_image',
		xRange: { min: -3.14, max: 3.14 },
		yRange: { min: -3.14, max: 3.14 },
	},
	{
		title: 'Gaussian Bell Curve',
		equation: 'e^{-(x^2 + y^2)}',
		previewImageUrl: 'path/to/gaussian_bell_curve_image',
		xRange: { min: -2, max: 2 },
		yRange: { min: -2, max: 2 },
	},
	{
		title: "Himmelblau's Function",
		equation: '(x^2 + y - 11)^2 + (x + y^2 - 7)^2',
		previewImageUrl: 'path/to/himmelblau_function_image',
		xRange: { min: -5, max: 5 },
		yRange: { min: -5, max: 5 },
	},
	{
		title: "Rosenbrock's Banana Function",
		equation: '(1 - x)^2 + 100(y - x^2)^2',
		previewImageUrl: 'path/to/rosenbrock_function_image',
		xRange: { min: -2, max: 2 },
		yRange: { min: -1, max: 3 },
	},
	{
		title: 'Sinc Function',
		equation: 'sin(sqrt(x^2 + y^2)) / sqrt(x^2 + y^2)',
		previewImageUrl: 'path/to/sinc_function_image',
		xRange: { min: -10, max: 10 },
		yRange: { min: -10, max: 10 },
	},
	{
		title: 'Multivariate Rastrigin Function',
		equation:
			'10(2) + (x^2 - 10 * cos(2 * pi * x)) + (y^2 - 10 * cos(2 * pi * y))',
		previewImageUrl: 'path/to/rastrigin_function_image',
		xRange: { min: -5.12, max: 5.12 },
		yRange: { min: -5.12, max: 5.12 },
	},
	{
		title: 'Egg Crate Function',
		equation: 'x^2 + y^2 + 25(sin(x)^2 + sin(y)^2)',
		previewImageUrl: 'path/to/egg_crate_function_image',
		xRange: { min: -5, max: 5 },
		yRange: { min: -5, max: 5 },
	},
] as const;
