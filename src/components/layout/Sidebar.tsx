import { useTranslations } from 'next-intl';
import { BookOpenText, Download, Library, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

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
					<Label htmlFor="formula_equation">Formula</Label>
					<Input
						type="number"
						placeholder="f(x, y) = 0"
						id="formula_equation"
						className="mt-2"
					/>
				</TabsContent>
				<TabsContent value="surface">
					<Label htmlFor="param_equation_x">X equation</Label>
					<Input
						type="number"
						placeholder="f(u, v) = 0"
						id="param_equation_x"
						className="mt-2"
					/>
					<Label htmlFor="param_equation_y">Y equation</Label>
					<Input
						type="number"
						placeholder="f(u, v) = 0"
						id="param_equation_y"
						className="mt-2"
					/>
					<Label htmlFor="param_equation_z">Z equation</Label>
					<Input
						type="number"
						placeholder="f(u, v) = 0"
						id="param_equation_z"
						className="mt-2"
					/>
				</TabsContent>
			</Tabs>
			<div>
				<Slider defaultValue={[-5, 5]} step={0.5} />
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
