'use client';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePlotStore } from '@/store/plot';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

type Solid = {
	color: string;
};

type Gradient = {
	gradient: string;
	colors: string[];
};

type Image = {
	url: string;
};

export type MaterialPickerValue = Solid | Gradient | Image;

export const useMaterialPicker = () => {
	const [surfaceColor, setSurfaceColor] = usePlotStore(
		useShallow((state) => [state.surfaceColor, state.setSurfaceColor]),
	);

	const [pickerValue, setPickerValue] = useState<MaterialPickerValue>({
		color: `#${surfaceColor.getHexString()}`,
	});

	const handleMaterialChange = useCallback(
		(value: MaterialPickerValue) => {
			if (value.color) {
				setSurfaceColor(value.color);
				setPickerValue({ color: value.color });
			}
		},
		[setSurfaceColor],
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
	];

	const gradients: Gradient[] = [
		{
			gradient: 'linear-gradient(to top left, #d5d4d0, #d5d4d0, #eeeeec)',
			colors: ['#d5d4d0', '#d5d4d0', '#eeeeec'],
		},
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
					className="flex flex-wrap gap-1 mt-0"
				>
					{solids.map((s) => (
						<div
							key={s}
							style={{ background: s }}
							className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
							onClick={() => setBackground({ color: s })}
						/>
					))}
				</TabsContent>

				<TabsContent value="gradient" className="mt-0">
					<div className="flex flex-wrap gap-1 mb-2">
						{gradients.map((s) => (
							<div
								key={s.gradient}
								style={{ background: s.gradient }}
								className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
								onClick={() => setBackground(s)}
							/>
						))}
					</div>
				</TabsContent>

				<TabsContent value="image" className="mt-0"></TabsContent>

				<TabsContent value="password">
					Change your password here.
				</TabsContent>
			</Tabs>

			<Input
				id="custom"
				value={
					background.color ?? background?.gradient ?? background?.url
				}
				className="col-span-2 h-8 mt-4"
				onChange={(e) =>
					setBackground({ color: e.currentTarget.value })
				}
			/>
		</div>
	);
}

const GradientButton = ({
	background,
	children,
}: {
	background: string;
	children: React.ReactNode;
}) => {
	return (
		<div
			className="p-0.5 rounded-md relative !bg-cover !bg-center transition-all"
			style={{ background }}
		>
			<div className="bg-popover/80 rounded-md p-1 text-xs text-center">
				{children}
			</div>
		</div>
	);
};
