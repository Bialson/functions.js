import { useTranslations } from 'next-intl';
import { BookOpenText, Download, Library, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { AxisRangeInput } from '../input/AxisRangeInput';
import { FormulaInput } from '../input/FormulaInput';

export const Sidebar: React.FC = () => {
	const t = useTranslations('Home');

	return (
		<div className="w-[20%] p-8 h-full bg-white dark:bg-layoutBackground flex flex-col">
			<div className="flex flex-row justify-between items-center">
				<h1 className="text-2xl font-bold">Functions 3D</h1>
				<Button variant="outline" size="icon">
					<Menu className="w-6 h-6" />{' '}
				</Button>
			</div>
			<Separator className="my-4" />
			<Tabs defaultValue="function">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="function">Equation</TabsTrigger>
					<TabsTrigger value="surface">Parametric</TabsTrigger>
				</TabsList>
				<TabsContent value="function">
					<div className="mt-4">
						<FormulaInput />
					</div>
				</TabsContent>
				<TabsContent value="surface">
					<div className="flex flex-col gap-4 mt-4">
						<FormulaInput isParametric axis="x" />
						<FormulaInput isParametric axis="y" />
						<FormulaInput isParametric axis="z" />
					</div>
				</TabsContent>
			</Tabs>
			<div className="flex flex-col gap-4 mt-8">
				<AxisRangeInput axis="x" />
				<Separator className="my-2" />
				<AxisRangeInput axis="y" />
				<Separator className="my-2" />
				<AxisRangeInput axis="z" />
			</div>
			<div className="mt-auto">
				<Separator className="my-4" />
				<Button variant="ghost" className="w-full justify-start">
					<BookOpenText className="mr-2 w-4 h-4" />
					Library
				</Button>
				<Button variant="ghost" className="w-full justify-start">
					<Download className="mr-2 w-4 h-4" />
					Export
				</Button>
			</div>
		</div>
	);
};
