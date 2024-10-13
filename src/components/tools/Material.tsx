import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Material: React.FC = () => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<Palette className="w-6 h-6" />
				</Button>
			</PopoverTrigger>
			<PopoverContent side="right" sideOffset={24}>
				Place content for the popover here.
			</PopoverContent>
		</Popover>
	);
};
