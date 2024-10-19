import { Separator } from '@/components/ui/separator';
import { Texture, Transform, Wireframe } from '@/components/tools';
import { Display } from '@/components/tools/Display';

export const Toolbox: React.FC = () => {
	return (
		<div className="absolute top-4 left-4 lg:left-[18.5%] bg-white p-2 dark:bg-layoutBackground flex flex-col rounded-md gap-2">
			<Texture />
			<Wireframe />
			<Separator />
			<Display />
			<Separator />
			<Transform />
		</div>
	);
};
