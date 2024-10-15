import { Separator } from '@/components/ui/separator';
import { Texture, Transform } from '@/components/tools';
import { Display } from '@/components/tools/Display';

export const Toolbox: React.FC = () => {
	return (
		<div className="absolute top-4 left-[18.5%] bg-white p-2 dark:bg-layoutBackground flex flex-col rounded-md">
			<Texture />
			<Separator className="my-2" />
			<Display />
			<Separator className="my-2" />
			<Transform />
		</div>
	);
};
