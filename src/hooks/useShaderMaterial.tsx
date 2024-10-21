import { COLOR_MAPS, ColorMap } from '@/assets/colors/colorMaps';
import { ParametricGeometry } from 'three-stdlib';
import { useEffect, useMemo, useRef } from 'react';
import { ShaderMaterialProps } from '@react-three/fiber';
import { FRAGMENT_SHADERS } from '@/assets/colors/colorMaps';
import { ShaderMaterial } from 'three';

type UseShaderMaterialArgs = {
	geometry: ParametricGeometry;
	colorMap: ColorMap;
	shaderMaterialProps?: ShaderMaterialProps;
};

const vertexShader = `
		uniform vec3 bboxMin;
		uniform vec3 bboxMax;

		varying vec2 vUv;

		#include <clipping_planes_pars_vertex>

		void main() {
			#include <begin_vertex>

			vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);

			#include <project_vertex>
            #include <clipping_planes_vertex>
		}
	`;

export const useShaderMaterial = ({
	geometry,
	colorMap,
	shaderMaterialProps,
}: UseShaderMaterialArgs) => {
	const materialRef = useRef<ShaderMaterial>(null);

	const colors = useMemo(() => COLOR_MAPS[colorMap].map, [colorMap]);

	const fragmentShader = useMemo(
		() => FRAGMENT_SHADERS[colorMap],
		[colorMap],
	);

	const uniforms = useMemo(
		() => ({
			colors: { value: colors },
			bboxMin: { value: geometry?.boundingBox?.min },
			bboxMax: { value: geometry?.boundingBox?.max },
			opacity: { value: shaderMaterialProps?.opacity },
		}),
		[],
	);

	useEffect(() => {
		if (materialRef.current) {
			materialRef.current.uniforms.colors.value = colors;
			materialRef.current.uniforms.bboxMin.value =
				geometry?.boundingBox?.min;
			materialRef.current.uniforms.bboxMax.value =
				geometry?.boundingBox?.max;
			materialRef.current.uniforms.opacity.value =
				shaderMaterialProps?.opacity;
		}
	}, [
		fragmentShader,
		colors,
		geometry.boundingBox,
		shaderMaterialProps?.opacity,
	]);

	return (
		<shaderMaterial
			key={colorMap}
			ref={materialRef}
			uniforms={uniforms}
			{...shaderMaterialProps}
			fragmentShader={fragmentShader}
			vertexShader={vertexShader}
			transparent
			side={2}
		/>
	);
};
