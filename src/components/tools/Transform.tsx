import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Move, Rotate3D, Scale3D } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupItem } from '@/components/ui/button-group';
import { TransformControls, usePlotStore } from '@/store/plot';
import { useShallow } from 'zustand/react/shallow';

export const Transform: React.FC = () => {
	const [transformMode, setTransformMode] = usePlotStore(
		useShallow((state) => [
			state.transformControlsMode,
			state.setTransformControlsMode,
		]),
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<Move className="w-6 h-6" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				side="right"
				align="start"
				sideOffset={24}
				className="bg-white dark:bg-layoutBackground"
			>
				<h3 className="font-semibold">Transform mode</h3>
				<p className="mb-4 text-gray-500">
					Select preffered transform mode
				</p>
				<ButtonGroup
					defaultValue={transformMode}
					onValueChange={(value) => {
						setTransformMode(value as TransformControls);
					}}
				>
					<ButtonGroupItem
						label="Move"
						icon={<Move className="w-6 h-6" />}
						value="move"
					/>
					<ButtonGroupItem
						label="Rotate"
						icon={<Rotate3D className="w-6 h-6" />}
						value="rotate"
					/>
					<ButtonGroupItem
						label="Scale"
						icon={<Scale3D className="w-6 h-6" />}
						value="scale"
					/>
				</ButtonGroup>
			</PopoverContent>
		</Popover>
	);
};
