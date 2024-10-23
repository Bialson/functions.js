import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { DialogHeader, DialogFooter } from '../ui/dialog';
import { BookOpenText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import Image from 'next/image';
import ImagePlaceholder from '@/assets/images/image_placeholder.png';
import { LIBRARY_ASSETS } from '@/assets/library/surfaces';
import { Fragment, useState } from 'react';
import { LibraryAsset } from '@/lib/assets/types';
import { useDataStore } from '@/store/data';
import { useShallow } from 'zustand/react/shallow';
import { useFormulaStore } from '@/store/formula';
import { Label } from '@radix-ui/react-label';
import Latex from 'react-latex-next';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { usePlotStore } from '@/store/plot';

export const AssetsLibrary: React.FC = () => {
	const t = useTranslations('library');

	const [selectedAsset, setSelectedAsset] = useState<LibraryAsset | null>(
		null,
	);

	const [setAxisMin, setAxisMax] = useDataStore(
		useShallow((state) => [state.setAxisMin, state.setAxisMax]),
	);

	const [setEquation] = useFormulaStore(
		useShallow((state) => [state.setEquation]),
	);

	const [setPlotType] = usePlotStore(
		useShallow((state) => [state.setPlotType]),
	);

	const closeDialog = () =>
		(
			document.querySelector('[data-state="open"]') as HTMLDivElement
		).click();

	const handleLoadAsset = () => {
		if (selectedAsset) {
			setAxisMin('x', selectedAsset.xRange.min);
			setAxisMax('x', selectedAsset.xRange.max);

			setAxisMin('y', selectedAsset.yRange.min);
			setAxisMax('y', selectedAsset.yRange.max);

			if (selectedAsset.parametric) {
				setEquation(selectedAsset.parametric.x, 'x');
				setEquation(selectedAsset.parametric.y, 'y');
				setEquation(selectedAsset.parametric.z, 'z');
				setPlotType('parametric');
			} else {
				setEquation(selectedAsset.equation);
				setPlotType('surface');
			}
		}
		closeDialog();
	};

	const handleSelectAsset = (asset: LibraryAsset) => setSelectedAsset(asset);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" className="w-full justify-start">
					<BookOpenText className="mr-2 w-4 h-4" />
					{t('library')}
				</Button>
			</DialogTrigger>
			<DialogContent className="min-w-full/1">
				<div className="flex flex-row gap-4 w-full">
					<ScrollArea className="h-96 w-full">
						<Accordion type="single" collapsible>
							<AccordionItem value="item-1">
								<AccordionTrigger className="text-sm">
									{t('category.surface')}
								</AccordionTrigger>
								<AccordionContent className="px-4">
									{LIBRARY_ASSETS.surface.map((asset) => (
										<Fragment key={asset.equation}>
											<div
												className="text-sm"
												onClick={() =>
													handleSelectAsset(asset)
												}
											>
												{asset.title}
											</div>
											<Separator className="my-2" />
										</Fragment>
									))}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
						<Accordion type="single" collapsible>
							<AccordionItem value="item-1">
								<AccordionTrigger className="text-sm">
									{t('category.parametric')}
								</AccordionTrigger>
								<AccordionContent className="px-4">
									{LIBRARY_ASSETS.parametric.map((asset) => (
										<Fragment key={asset.title}>
											<div
												className="text-sm"
												onClick={() =>
													handleSelectAsset(asset)
												}
											>
												{asset.title}
											</div>
											<Separator className="my-2" />
										</Fragment>
									))}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</ScrollArea>
					<Separator orientation="vertical" />
					<div className="p-2 flex flex-col w-full h-full justify-around">
						<DialogHeader>
							<DialogTitle>{t('title')}</DialogTitle>
							<DialogDescription>
								{t('subtitle')}
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="flex flex-col justify-between h-full">
								<Image
									alt="texture_preview"
									src={ImagePlaceholder}
									width={200}
									height={200}
									className="rounded-md aspect-video w-full object-cover"
								/>
								{selectedAsset && (
									<div className="flex flex-col gap-2">
										<Label className="font-bold">
											{selectedAsset?.title}
										</Label>
										<Label className="text-xs text-justify">
											{selectedAsset?.parametric ? (
												<Fragment>
													<Latex>{`$f(u, v) = ${selectedAsset?.parametric.x}$`}</Latex>
													<Latex>{`$f(u, v) = ${selectedAsset?.parametric.y}$`}</Latex>
													<Latex>{`$f(u, v) = ${selectedAsset?.parametric.z}$`}</Latex>
												</Fragment>
											) : (
												<Latex>{`$f(x, y) = ${selectedAsset?.equation}$`}</Latex>
											)}
										</Label>
									</div>
								)}
							</div>
						</div>
						<DialogFooter>
							<Button type="submit" onClick={handleLoadAsset}>
								{t('button')}
							</Button>
						</DialogFooter>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
