import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupItem } from '@/components/ui/button-group';
import { useTranslations } from 'next-intl';
import { DisplayMode, usePlotStore } from '@/store/plot';
import { PiCubeFill, PiCube, PiCubeFocus } from 'react-icons/pi';
import { useShallow } from 'zustand/react/shallow';

export const Display: React.FC = () => {
	const [displayMode, setDisplayMode] = usePlotStore(
		useShallow((state) => [state.displayMode, state.setDisplayMode]),
	);

	const t = useTranslations('toolbox.display');

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<PiCubeFocus className="w-6 h-6" />
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
				<ButtonGroup
					orientation="vertical"
					defaultValue={displayMode}
					onValueChange={(value) => {
						setDisplayMode(value as DisplayMode);
					}}
				>
					<ButtonGroupItem
						label={t('solid')}
						icon={<PiCubeFill className="w-6 h-6" />}
						value="surface"
					/>
					<ButtonGroupItem
						label={t('wireframe')}
						icon={<PiCube className="w-6 h-6" />}
						value="wireframe"
					/>
				</ButtonGroup>
			</PopoverContent>
		</Popover>
	);
};
