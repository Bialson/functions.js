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
	| 'yIGnBu'
	| 'yIOrRd'
	| 'bluered'
	| 'rdBu'
	| 'picnic';

export type ColorMap = ColorMaps[number];

type ColorMapValue = {
	[key in ColorMap]: { map: Color[]; css: string };
};

type FramgnetShaderValue = {
	[key in ColorMap]: string;
};

const createColorMap = (colors: string[]): Color[] =>
	colors.map((color) => new Color(color));

export const COLOR_MAPS: ColorMapValue = {
	jet: {
		map: createColorMap([
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
		css: 'linear-gradient(to right, #00007F, #0000FF, #007FFF, #00FFFF, #7FFF7F, #FFFF00, #FF7F00, #FF0000, #7F0000)',
	},
	hot: {
		map: createColorMap([
			'#000000',
			'#800000',
			'#FF0000',
			'#FF8000',
			'#FFFF00',
			'#FFFF80',
			'#FFFFFF',
		]),
		css: 'linear-gradient(to right, #000000, #800000, #FF0000, #FF8000, #FFFF00, #FFFF80, #FFFFFF)',
	},
	cool: {
		map: createColorMap(['#00FFFF', '#0000FF']),
		css: 'linear-gradient(to right, #00FFFF, #0000FF)',
	},
	spring: {
		map: createColorMap(['#FF00FF', '#FFFF00']),
		css: 'linear-gradient(to right, #FF00FF, #FFFF00)',
	},
	summer: {
		map: createColorMap(['#008066', '#FFFF66']),
		css: 'linear-gradient(to right, #008066, #FFFF66)',
	},
	autumn: {
		map: createColorMap(['#FF0000', '#FFFF00']),
		css: 'linear-gradient(to right, #FF0000, #FFFF00)',
	},
	winter: {
		map: createColorMap(['#0000FF', '#008066']),
		css: 'linear-gradient(to right, #0000FF, #008066)',
	},
	bone: {
		map: createColorMap(['#000000', '#545454', '#A6A6A6', '#FFFFFF']),
		css: 'linear-gradient(to right, #000000, #545454, #A6A6A6, #FFFFFF)',
	},
	copper: {
		map: createColorMap(['#000000', '#FF6600', '#FFFFCC']),
		css: 'linear-gradient(to right, #000000, #FF6600, #FFFFCC)',
	},
	greys: {
		map: createColorMap(['#DA321F', '#A6A6A6']),
		css: 'linear-gradient(to right, #DA321F, #A6A6A6)',
	},
	yIGnBu: {
		map: createColorMap([
			'#FFFFD9',
			'#EDF8B1',
			'#C7E9B4',
			'#7FCDBB',
			'#41B6C4',
			'#1D91C0',
			'#225EA8',
			'#0C2C84',
		]),
		css: 'linear-gradient(to right, #FFFFD9, #EDF8B1, #C7E9B4, #7FCDBB, #41B6C4, #1D91C0)',
	},
	yIOrRd: {
		map: createColorMap([
			'#FFFFCC',
			'#FFEDA0',
			'#FED976',
			'#FEB24C',
			'#FD8D3C',
			'#FC4E2A',
			'#E31A1C',
			'#BD0026',
			'#800026',
		]),
		css: 'linear-gradient(to right, #FFFFCC, #FFEDA0, #FED976, #FEB24C, #FD8D3C, #FC4E2A, #E31A1C, #BD0026, #800026',
	},
	bluered: {
		map: createColorMap(['#0000FF', '#FF0000']),
		css: 'linear-gradient(to right, #0000FF, #FF0000)',
	},
	rdBu: {
		map: createColorMap([
			'#B2182B',
			'#D6604D',
			'#F4A582',
			'#FDDBC7',
			'#F7F7F7',
			'#D1E5F0',
			'#92C5DE',
			'#4393C3',
			'#2166AC',
		]),
		css: 'linear-gradient(to right, #B2182B, #D6604D, #F4A582, #FDDBC7, #F7F7F7, #D1E5F0, #92C5DE, #4393C3, #2166AC)',
	},
	picnic: {
		map: createColorMap([
			'#0000FF',
			'#3399FF',
			'#66CCFF',
			'#99CCFF',
			'#CCCCFF',
			'#FFFFFF',
			'#FFCCFF',
			'#FF99FF',
			'#FF66FF',
			'#FF33FF',
			'#FF00FF',
		]),
		css: 'linear-gradient(to right, #0000FF, #3399FF, #66CCFF, #99CCFF, #CCCCFF, #FFFFFF, #FFCCFF, #FF99FF, #FF66FF, #FF33FF, #FF00FF)',
	},
} as const;

export const FRAGMENT_SHADERS: FramgnetShaderValue = {
	jet: `
        uniform vec3 colors[9];
        varying vec2 vUv;
        uniform float opacity;

		#include <clipping_planes_pars_fragment>

        void main() {
			#include <clipping_planes_fragment>

            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 0.125, 0.0, 1.0));
            color = mix(color, colors[2], clamp((t - 0.125) / 0.125, 0.0, 1.0));
            color = mix(color, colors[3], clamp((t - 0.25) / 0.125, 0.0, 1.0));
            color = mix(color, colors[4], clamp((t - 0.375) / 0.125, 0.0, 1.0));
            color = mix(color, colors[5], clamp((t - 0.5) / 0.125, 0.0, 1.0));
            color = mix(color, colors[6], clamp((t - 0.625) / 0.125, 0.0, 1.0));
            color = mix(color, colors[7], clamp((t - 0.75) / 0.125, 0.0, 1.0));
            color = mix(color, colors[8], clamp((t - 0.875) / 0.125, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
        `,

	hot: `
        uniform vec3 colors[7];
        varying vec2 vUv;
        uniform float opacity;
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 0.125, 0.0, 1.0));
            color = mix(color, colors[2], clamp((t - 0.125) / 0.125, 0.0, 1.0));
            color = mix(color, colors[3], clamp((t - 0.25) / 0.125, 0.0, 1.0));
            color = mix(color, colors[4], clamp((t - 0.375) / 0.125, 0.0, 1.0));
            color = mix(color, colors[5], clamp((t - 0.5) / 0.125, 0.0, 1.0));
            color = mix(color, colors[6], clamp((t - 0.625) / 0.125, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
        `,

	cool: `
        uniform vec3 colors[2];
        varying vec2 vUv;
        uniform float opacity;
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 1.0, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
        `,

	spring: `
        uniform vec3 colors[2];
        varying vec2 vUv;
        uniform float opacity;
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 1.0, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
        `,

	summer: `
        uniform vec3 colors[2];
        varying vec2 vUv;
        uniform float opacity;
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 1.0, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
        `,

	autumn: `
        uniform vec3 colors[2];
        varying vec2 vUv;
        uniform float opacity;
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 1.0, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
        `,

	winter: `
        uniform vec3 colors[2];
        varying vec2 vUv;
        uniform float opacity;
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 1.0, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
        `,

	bone: `
        uniform vec3 colors[4];
        varying vec2 vUv;
        uniform float opacity;
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 0.333, 0.0, 1.0));
            color = mix(color, colors[2], clamp((t - 0.333) / 0.333, 0.0, 1.0));
            color = mix(color, colors[3], clamp((t - 0.666) / 0.333, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
        `,

	copper: `
        uniform vec3 colors[3];
        varying vec2 vUv;
        uniform float opacity;
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 0.5, 0.0, 1.0));
            color = mix(color, colors[2], clamp((t - 0.5) / 0.5, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
        `,

	greys: `
        uniform vec3 colors[2];
        varying vec2 vUv;
        uniform float opacity;
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 1.0, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
    `,

	yIGnBu: `
        uniform vec3 colors[8];
        varying vec2 vUv;
        uniform float opacity;
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 0.125, 0.0, 1.0));
            color = mix(color, colors[2], clamp((t - 0.125) / 0.125, 0.0, 1.0));
            color = mix(color, colors[3], clamp((t - 0.25) / 0.125, 0.0, 1.0));
            color = mix(color, colors[4], clamp((t - 0.375) / 0.125, 0.0, 1.0));
            color = mix(color, colors[5], clamp((t - 0.5) / 0.125, 0.0, 1.0));
            color = mix(color, colors[6], clamp((t - 0.625) / 0.125, 0.0, 1.0));
            color = mix(color, colors[7], clamp((t - 0.75) / 0.125, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
        `,

	yIOrRd: `
        uniform vec3 colors[9];
        varying vec2 vUv;
        uniform float opacity;
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 0.111, 0.0, 1.0));
            color = mix(color, colors[2], clamp((t - 0.111) / 0.111, 0.0, 1.0));
            color = mix(color, colors[3], clamp((t - 0.222) / 0.111, 0.0, 1.0));
            color = mix(color, colors[4], clamp((t - 0.333) / 0.111, 0.0, 1.0));
            color = mix(color, colors[5], clamp((t - 0.444) / 0.111, 0.0, 1.0));
            color = mix(color, colors[6], clamp((t - 0.555) / 0.111, 0.0, 1.0));
            color = mix(color, colors[7], clamp((t - 0.666) / 0.111, 0.0, 1.0));
            color = mix(color, colors[8], clamp((t - 0.777) / 0.111, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
        `,

	bluered: `
        uniform vec3 colors[2];
        varying vec2 vUv;
        uniform float opacity;
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 1.0, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
    `,

	rdBu: `
		uniform vec3 colors[9];
		varying vec2 vUv;
		uniform float opacity;
		#include <clipping_planes_pars_fragment>
		void main() {
			#include <clipping_planes_fragment>
			float t = vUv.y;
			vec3 color = colors[0];
			color = mix(color, colors[1], clamp((t - 0.0) / 0.125, 0.0, 1.0));
			color = mix(color, colors[2], clamp((t - 0.125) / 0.125, 0.0, 1.0));
			color = mix(color, colors[3], clamp((t - 0.25) / 0.125, 0.0, 1.0));
			color = mix(color, colors[4], clamp((t - 0.375) / 0.125, 0.0, 1.0));
			color = mix(color, colors[5], clamp((t - 0.5) / 0.125, 0.0, 1.0));
			color = mix(color, colors[6], clamp((t - 0.625) / 0.125, 0.0, 1.0));
			color = mix(color, colors[7], clamp((t - 0.75) / 0.125, 0.0, 1.0));
			color = mix(color, colors[8], clamp((t - 0.875) / 0.125, 0.0, 1.0));
			gl_FragColor = vec4(color, opacity);
		}
    `,

	picnic: `
        uniform vec3 colors[6];
        varying vec2 vUv;
        uniform float opacity;
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            float t = vUv.y;
            vec3 color = colors[0];
            color = mix(color, colors[1], clamp((t - 0.0) / 0.166, 0.0, 1.0));
            color = mix(color, colors[2], clamp((t - 0.166) / 0.166, 0.0, 1.0));
            color = mix(color, colors[3], clamp((t - 0.332) / 0.166, 0.0, 1.0));
            color = mix(color, colors[4], clamp((t - 0.498) / 0.166, 0.0, 1.0));
            color = mix(color, colors[5], clamp((t - 0.664) / 0.166, 0.0, 1.0));
            gl_FragColor = vec4(color, opacity);
        }
    `,
} as const;
