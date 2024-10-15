import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { PiSphereFill } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useMaterialPicker } from '../ui/material-picker';
import { Opacity } from './Opacity';

export const Texture: React.FC = () => {
	const { pickerValue, PickerComponent } = useMaterialPicker();

	const t = useTranslations('toolbox.texture');

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<PiSphereFill className="w-6 h-6" />
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
					<div className="bg-[#242627] rounded-md w-full aspect-video flex items-center justify-center">
						<div
							className={`w-24 h-24 rounded-full shadow-[inset_-20px_-20px_40px_rgba(255,255,255,0.5),inset_20px_20px_40px_rgba(0,0,0,0.2),10px_10px_30px_rgba(0,0,0,0.5)]`}
							style={{
								background:
									pickerValue?.color ?? pickerValue?.gradient,
							}}
						/>
					</div>
					{PickerComponent}
					<Opacity />
				</div>
			</PopoverContent>
		</Popover>
	);
};
