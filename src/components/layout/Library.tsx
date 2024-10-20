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
import { ScrollArea } from '../ui/scroll-area';
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

	// const handleSelectAsset = (asset: LibraryAsset) => {
	// 	console.log('Selected asset:', asset);

	// 	setAxisMin('x', asset.xRange.min);
	// 	setAxisMax('x', asset.xRange.max);

	// 	setAxisMin('y', asset.yRange.min);
	// 	setAxisMax('y', asset.yRange.max);

	// 	if (asset.parametric) {
	// 		setEquation(asset.parametric.x, 'x');
	// 		setEquation(asset.parametric.y, 'y');
	// 		setEquation(asset.parametric.z, 'z');
	// 	} else {
	// 		setEquation(asset.equation);
	// 	}
	// };

	const handleSelectAsset = (asset: LibraryAsset) => setSelectedAsset(asset);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" className="w-full justify-start">
					<BookOpenText className="mr-2 w-4 h-4" />
					{t('library')}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full">
				<div className="flex flex-row gap-4 w-full">
					<ScrollArea className="h-96">
						<div className="p-4">
							{LIBRARY_ASSETS.map((asset) => (
								<Fragment>
									<div
										key={asset.equation}
										className="text-sm"
										onClick={() => handleSelectAsset(asset)}
									>
										{asset.title}
									</div>
									<Separator className="my-2" />
								</Fragment>
							))}
						</div>
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
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
