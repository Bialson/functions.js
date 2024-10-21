'use client';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePlotStore } from '@/store/plot';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { HexColorPicker } from 'react-colorful';
import { Separator } from './separator';
import Image from 'next/image';
import ImagePlaceholder from '@/assets/images/image_placeholder.png';
import { COLOR_MAPS } from '@/assets/colors/colorMaps';
import { Color } from 'three';

type Solid = {
	color: string;
};

type Gradient = {
	gradient: string;
	colors: Color[];
	name: string;
};

type Image = {
	url: string;
	name: string;
};

export type MaterialPickerValue = Solid | Gradient | Image;

export const useMaterialPicker = () => {
	const [
		surfaceColor,
		setSurfaceColor,
		setMaterialURL,
		setColorMap,
		setFillType,
	] = usePlotStore(
		useShallow((state) => [
			state.surfaceColor,
			state.setSurfaceColor,
			state.setMaterialURL,
			state.setColorMap,
			state.setFillType,
		]),
	);

	const [pickerValue, setPickerValue] = useState<MaterialPickerValue>({
		color: `#${surfaceColor.getHexString()}`,
	});

	const handleMaterialChange = useCallback(
		(value: MaterialPickerValue) => {
			if ('color' in value) {
				setSurfaceColor(value?.color);
				setPickerValue({ color: value?.color });
				setMaterialURL(undefined);
				setFillType('solid');
			}
			if ('colors' in value && 'gradient' in value) {
				setPickerValue({
					gradient: value?.gradient,
					colors: value?.colors,
					name: value?.name,
				});
				setColorMap(value.name);
				setMaterialURL(undefined);
				setFillType('colormap');
			}
			if ('url' in value) {
				setPickerValue({ url: value?.url, name: value?.name });
				setMaterialURL(value.url);
				setFillType('solid');
			}
		},
		[setColorMap, setSurfaceColor, setMaterialURL, setFillType],
	);

	const PickerComponent = useMemo(
		() => (
			<MaterialPicker
				background={pickerValue}
				setBackground={handleMaterialChange}
			/>
		),
		[pickerValue, handleMaterialChange],
	);

	return {
		pickerValue,
		PickerComponent,
	};
};

export function MaterialPicker({
	background,
	setBackground,
	className,
}: {
	background: MaterialPickerValue;
	setBackground: (value: MaterialPickerValue) => void;
	className?: string;
}) {
	const t = useTranslations('toolbox.texture.color-picker');

	const solids = [
		'#E2E2E2',
		'#ff75c3',
		'#ffa647',
		'#ffe83f',
		'#9fff5b',
		'#70e2ff',
		'#cd93ff',
		'#09203f',
		'#537895',
	];

	const gradients = [
		{
			gradient: 'linear-gradient(to top left, #d5d4d0, #d5d4d0, #eeeeec)',
			colors: ['#d5d4d0', '#d5d4d0', '#eeeeec'],
		},
		{
			gradient: 'linear-gradient(to top left, #000000, #434343)',
			colors: ['#000000', '#434343'],
		},
		{
			gradient: 'linear-gradient(to top left, #09203f, #537895)',
			colors: ['#09203f', '#537895'],
		},
		{
			gradient: 'linear-gradient(to top left, #AC32E4, #7918F2, #4801FF)',
			colors: ['#AC32E4', '#7918F2', '#4801FF'],
		},
		{
			gradient: 'linear-gradient(to top left, #f953c6, #b91d73)',
			colors: ['#f953c6', '#b91d73'],
		},
		{
			gradient: 'linear-gradient(to top left, #ee0979, #ff6a00)',
			colors: ['#ee0979', '#ff6a00'],
		},
		{
			gradient: 'linear-gradient(to top left, #F00000, #DC281E)',
			colors: ['#F00000', '#DC281E'],
		},
		{
			gradient: 'linear-gradient(to top left, #00c6ff, #0072ff)',
			colors: ['#00c6ff', '#0072ff'],
		},
		{
			gradient: 'linear-gradient(to top left, #4facfe, #00f2fe)',
			colors: ['#4facfe', '#00f2fe'],
		},
		{
			gradient: 'linear-gradient(to top left, #0ba360, #3cba92)',
			colors: ['#0ba360', '#3cba92'],
		},
		{
			gradient: 'linear-gradient(to top left, #FDFC47, #24FE41)',
			colors: ['#FDFC47', '#24FE41'],
		},
		{
			gradient:
				'linear-gradient(to top left, #8a2be2, #0000cd, #228b22, #ccff00)',
			colors: ['#8a2be2', '#0000cd', '#228b22', '#ccff00'],
		},
		{
			gradient: 'linear-gradient(to top left, #40E0D0, #FF8C00, #FF0080)',
			colors: ['#40E0D0', '#FF8C00', '#FF0080'],
		},
		{
			gradient:
				'linear-gradient(to top left, #fcc5e4, #fda34b, #ff7882, #c8699e, #7046aa, #0c1db8, #020f75)',
			colors: [
				'#fcc5e4',
				'#fda34b',
				'#ff7882',
				'#c8699e',
				'#7046aa',
				'#0c1db8',
				'#020f75',
			],
		},
		{
			gradient:
				'linear-gradient(to top left, #ff75c3, #ffa647, #ffe83f, #9fff5b, #70e2ff, #cd93ff)',
			colors: [
				'#ff75c3',
				'#ffa647',
				'#ffe83f',
				'#9fff5b',
				'#70e2ff',
				'#cd93ff',
			],
		},
	];

	const defaultTab = useMemo(() => {
		if ((background as Image)?.url?.includes('url')) return 'image';
		if ((background as Image)?.url?.includes('gradient')) return 'gradient';
		return 'solid';
	}, [background]);

	return (
		<div className={className}>
			<Tabs defaultValue={defaultTab} className="w-full">
				<TabsList className="w-full mb-4">
					<TabsTrigger className="flex-1" value="solid">
						{t('solid')}
					</TabsTrigger>
					<TabsTrigger className="flex-1" value="gradient">
						{t('gradient')}
					</TabsTrigger>
					<TabsTrigger className="flex-1" value="image">
						{t('image')}
					</TabsTrigger>
				</TabsList>

				<TabsContent
					value="solid"
					className="flex flex-wrap gap-1 mt-0 w-full"
				>
					{solids.map((s) => (
						<div
							key={s}
							style={{ background: s }}
							className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
							onClick={() => setBackground({ color: s })}
						/>
					))}
					<Separator className="my-4" />
					<HexColorPicker
						className="hex-color-picker"
						color={(background as Solid)?.color}
						onChange={(color) => setBackground({ color })}
						style={{ width: '100%' }}
					/>
				</TabsContent>

				<TabsContent value="gradient" className="mt-0">
					<div className="flex flex-wrap gap-1 mb-2">
						{Object.values(COLOR_MAPS).map((value) => (
							<div
								key={value.css}
								style={{ background: value.css }}
								className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
								onClick={() => {
									const name = Object.keys(COLOR_MAPS).find(
										(key) =>
											COLOR_MAPS[
												key as keyof typeof COLOR_MAPS
											] === value,
									);

									setBackground({
										gradient: value.css,
										colors: value.map,
										name: name,
									});
								}}
							/>
						))}
					</div>
				</TabsContent>

				<TabsContent value="image" className="mt-0">
					<Image
						alt="texture_preview"
						src={(background as Image)?.url ?? ImagePlaceholder}
						width={200}
						height={200}
						className="rounded-md aspect-video w-full object-cover"
					/>
					<Input
						type="file"
						onChange={(e) => {
							const image = e.target.files && e.target.files[0];
							if (image) {
								const url = URL.createObjectURL(image);
								setBackground({ url: url, name: image.name });
							}
						}}
						className="mt-4"
					/>
				</TabsContent>
				<TabsContent value="password">
					Change your password here.
				</TabsContent>
			</Tabs>

			<Input
				id="custom"
				value={
					(background as Image)?.name ??
					(background as Solid)?.color ??
					(background as Gradient)?.gradient
				}
				className="col-span-2 h-8 mt-4"
				onChange={(e) =>
					setBackground({ color: e.currentTarget.value })
				}
			/>
		</div>
	);
}
