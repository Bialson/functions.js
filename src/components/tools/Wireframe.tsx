import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { PiSphere } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useShallow } from 'zustand/react/shallow';
import { HexColorPicker } from 'react-colorful';
import { usePlotStore } from '@/store/plot';

export const Wireframe: React.FC = () => {
	const [wireframeColor, setWireframeColor] = usePlotStore(
		useShallow((state) => [state.wireframeColor, state.setWireframeColor]),
	);

	const t = useTranslations('toolbox.wireframe');

	const handlePickerChange = (color: string) => setWireframeColor(color);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<PiSphere className="w-6 h-6" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				side="right"
				align="start"
				sideOffset={24}
				className="bg-white dark:bg-layoutBackground"
			>
				<h3 className="font-semibold">{t('title')}</h3>
				<p className="mb-4 text-gray-500">{t('subtitle')}</p>
				<div className="flex flex-col gap-4">
					<HexColorPicker
						className="hex-color-picker"
						color={`#${wireframeColor.getHexString()}`}
						onChange={handlePickerChange}
						style={{ width: '100%' }}
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
};
