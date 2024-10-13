import { Separator } from '@/components/ui/separator';
import { Material, Transform } from '@/components/tools';

export const Toolbox: React.FC = () => {
	return (
		<div className="absolute top-4 left-[20.5%] bg-white p-2 dark:bg-layoutBackground flex flex-col rounded-md">
			<Material />
			<Separator className="my-2" />
			<Transform />
		</div>
	);
};
