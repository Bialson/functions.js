import { BookOpenText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AxisRangeInput } from '../input/AxisRangeInput';
import { FormulaInput } from '../input/FormulaInput';
import { useTranslations } from 'next-intl';
import { PlotType, usePlotStore } from '@/store/plot';
import { useShallow } from 'zustand/react/shallow';
import { ScrollArea } from '../ui/scroll-area';
import { AssetsLibrary } from './Library';
import { Export } from './Export';

export const Sidebar: React.FC = () => {
	const t = useTranslations('sidebar');

	const [setPlotType] = usePlotStore(
		useShallow((state) => [state.setPlotType]),
	);

	const handleTabChange = (value: string) => setPlotType(value as PlotType);

	return (
		<div className="lg:absolute lg:top-0 bottom-0 left-0 w-full lg:w-[18svw] p-8 h-2/3 lg:h-dvh overflow-hidden bg-white dark:bg-layoutBackground flex flex-col">
			<div className="flex-row justify-between items-center hidden lg:flex">
				<h1 className="text-2xl font-bold">Functions 3D</h1>
			</div>
			<Separator className="my-4 hidden lg:flex" />
			<ScrollArea className="h-full">
				<div className="h-full flex flex-col">
					<Tabs
						defaultValue="surface"
						onValueChange={handleTabChange}
					>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="surface">
								{t('equation')}
							</TabsTrigger>
							<TabsTrigger value="parametric">
								{t('parametric')}
							</TabsTrigger>
						</TabsList>
						<TabsContent value="surface">
							<div className="mt-4 p-1">
								<FormulaInput />
							</div>
						</TabsContent>
						<TabsContent value="parametric">
							<div className="flex flex-col gap-4 mt-4 p-1">
								<FormulaInput isParametric axis="x" />
								<FormulaInput isParametric axis="y" />
								<FormulaInput isParametric axis="z" />
							</div>
						</TabsContent>
					</Tabs>
					<div className="p-1">
						<AxisRangeInput axis="x" />
						<Separator className="my-2" />
						<AxisRangeInput axis="y" />
						<Separator className="my-2" />
						<AxisRangeInput axis="z" />
					</div>
					<div className="mt-auto p-1">
						<Separator className="my-4" />
						<AssetsLibrary />
						<Export />
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};
