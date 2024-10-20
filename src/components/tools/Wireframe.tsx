import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useShallow } from 'zustand/react/shallow';
import { HexColorPicker } from 'react-colorful';
import { BsGrid3X3 } from 'react-icons/bs';
import { usePlotStore } from '@/store/plot';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';

export const Wireframe: React.FC = () => {
	const [wireframeColor, setWireframeColor] = usePlotStore(
		useShallow((state) => [state.wireframeColor, state.setWireframeColor]),
	);

	const t = useTranslations('toolbox.wireframe');

	const handlePickerChange = (color: string) => setWireframeColor(color);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		const hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

		if (hexRegex.test(value)) {
			setWireframeColor(value);
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<BsGrid3X3 className="w-6 h-6" />
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
					<Label>{t('color')}</Label>
					<HexColorPicker
						className="hex-color-picker"
						color={`#${wireframeColor.getHexString()}`}
						onChange={handlePickerChange}
						style={{ width: '100%' }}
					/>
					<Input
						type="text"
						value={`#${wireframeColor.getHexString()}`}
						onChange={handleInputChange}
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
};
