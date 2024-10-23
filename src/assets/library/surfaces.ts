import { LibraryAsset } from '@/lib/assets/types';

const SURFACE_ASSETS = [
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
];

const PARAMETRIC_ASSETS = [
	{
		title: 'Cylinder',

		previewImageUrl: 'path/to/cylinder_image',
		parametric: {
			x: 'cos(u)',
			y: 'sin(u)',
			z: 'v',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: 'Sphere',

		previewImageUrl: 'path/to/sphere_image',
		parametric: {
			x: 'sin(u) * cos(v)',
			y: 'sin(u) * sin(v)',
			z: 'cos(u)',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: 'Torus',

		previewImageUrl: 'path/to/torus_image',
		parametric: {
			x: '(3 + cos(v)) * cos(u)',
			y: '(3 + cos(v)) * sin(u)',
			z: 'sin(v)',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: 'Hyperboloid of One Sheet',

		previewImageUrl: 'path/to/hyperboloid_image',
		parametric: {
			x: 'cosh(v) * cos(u)',
			y: 'cosh(v) * sin(u)',
			z: 'sinh(v)',
		},
		xRange: { min: -2, max: 2 },
		yRange: { min: -2, max: 2 },
	},
	{
		title: 'Ellipsoid',

		previewImageUrl: 'path/to/ellipsoid_image',
		parametric: {
			x: 'a * cos(u) * sin(v)',
			y: 'b * sin(u) * sin(v)',
			z: 'cos(v)',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: 'Cone',

		previewImageUrl: 'path/to/cone_image',
		parametric: {
			x: 'v * cos(u)',
			y: 'v * sin(u)',
			z: '2 - v',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: 'Möbius Strip',

		previewImageUrl: 'path/to/mobius_strip_image',
		parametric: {
			x: '(1 + v / 2 * cos(u / 2)) * cos(u)',
			y: '(1 + v / 2 * cos(u / 2)) * sin(u)',
			z: 'v / 2 * sin(u / 2)',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: 'Helicoid',

		previewImageUrl: 'path/to/helicoid_image',
		parametric: {
			x: 'u * cos(v)',
			y: 'u * sin(v)',
			z: 'a * v',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: 'Catenoid',

		previewImageUrl: 'path/to/catenoid_image',
		parametric: {
			x: 'cosh(u) * cos(v)',
			y: 'cosh(u) * sin(v)',
			z: 'u',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: 'Klein Bottle',

		previewImageUrl: 'path/to/klein_bottle_image',
		parametric: {
			x: '(1 + cos(u / 2) * sin(v) - sin(u / 2) * sin(2 * v)) * cos(u)',
			y: '(1 + cos(u / 2) * sin(v) - sin(u / 2) * sin(2 * v)) * sin(u)',
			z: 'sin(u / 2) * sin(v) + cos(u / 2) * sin(2 * v)',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: 'Paraboloid',

		previewImageUrl: 'path/to/paraboloid_image',
		parametric: {
			x: 'u * cos(v)',
			y: 'u * sin(v)',
			z: 'u^2',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: 'Hyperbolic Paraboloid',

		previewImageUrl: 'path/to/hyperbolic_paraboloid_image',
		parametric: {
			x: 'u',
			y: 'v',
			z: 'u^2 - v^2',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: 'Elliptic Cone',

		previewImageUrl: 'path/to/elliptic_cone_image',
		parametric: {
			x: 'a * v * cos(u)',
			y: 'b * v * sin(u)',
			z: 'v',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: 'Trefoil Knot',

		previewImageUrl: 'path/to/trefoil_knot_image',
		parametric: {
			x: 'sin(u) + 2 * sin(2 * u)',
			y: 'cos(u) - 2 * cos(2 * u)',
			z: '-sin(3 * u)',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: 'Lemniscate of Gerono',

		previewImageUrl: 'path/to/lemniscate_image',
		parametric: {
			x: 'cos(u)',
			y: 'sin(2 * u) / 2',
			z: '0',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
	{
		title: "Viviani's Curve",

		previewImageUrl: 'path/to/viviani_curve_image',
		parametric: {
			x: '1 + cos(u)',
			y: 'sin(u)',
			z: '2 * sin(u / 2)',
		},
		xRange: { min: -1, max: 1 },
		yRange: { min: -1, max: 1 },
	},
];

export const LIBRARY_ASSETS = {
	surface: SURFACE_ASSETS,
	parametric: PARAMETRIC_ASSETS,
} as const;
