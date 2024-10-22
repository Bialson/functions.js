import { convert } from '@/lib/convert';
import { usePlotStore } from '@/store/plot';
import { Download, Plane, Sheet } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { HiSquare3Stack3D } from 'react-icons/hi2';
import { TbHexagon3D } from 'react-icons/tb';
import { ButtonGroup, ButtonGroupItem } from '../ui/button-group';
import { useState } from 'react';

type ExportOption = 'OBJ' | 'STL' | 'CSV';

export const Export: React.FC = () => {
	const t = useTranslations('export');

	const [groupRef] = usePlotStore(useShallow((state) => [state.groupRef]));

	const [exportOption, setExportOption] = useState<ExportOption>('STL');

	const createDownloadableFile = (data: string, extension: string) => {
		const blob = new Blob([data], {
			type: extension === 'csv' ? 'text/csv' : 'text/plain',
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `scene.${extension}`;
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleOBJExport = async () => {
		console.log(groupRef);
		if (groupRef) {
			const scene = groupRef.current;
			const data = await convert(scene, 'OBJ');
			createDownloadableFile(data, 'obj');
		}
	};

	const handleSTLExport = async () => {
		if (groupRef) {
			const scene = groupRef.current;
			const data = await convert(scene, 'STL');
			createDownloadableFile(data, 'stl');
		}
	};

	const handleCSVExport = async () => {
		if (groupRef) {
			const scene = groupRef.current;
			const data = await convert(scene, 'CSV');
			createDownloadableFile(data, 'csv');
		}
	};

	const closeDialog = () =>
		(
			document.querySelector('[data-state="open"]') as HTMLDivElement
		).click();

	const handleExport = () => {
		switch (exportOption) {
			case 'OBJ':
				handleOBJExport().then(closeDialog);
				break;
			case 'STL':
				handleSTLExport().then(closeDialog);
				break;
			case 'CSV':
				handleCSVExport().then(closeDialog);
				break;
			default:
				break;
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" className="w-full justify-start">
					<Download className="mr-2 w-4 h-4" />
					{t('export')}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full">
				<DialogHeader>
					<DialogTitle>{t('title')}</DialogTitle>
					<DialogDescription>{t('subtitle')}</DialogDescription>
				</DialogHeader>
				<ButtonGroup
					value={exportOption}
					onValueChange={(value) =>
						setExportOption(value as ExportOption)
					}
					className="mt-4"
				>
					<ButtonGroupItem
						icon={<HiSquare3Stack3D className="w-6 h-6" />}
						value="STL"
						label={t('format.stl')}
						onClick={handleSTLExport}
					/>
					<ButtonGroupItem
						icon={<TbHexagon3D className="w-6 h-6" />}
						value="OBJ"
						label={t('format.obj')}
						onClick={handleOBJExport}
					/>
					<ButtonGroupItem
						icon={<Sheet className="w-6 h-6" />}
						value="CSV"
						label={t('format.csv')}
						onClick={handleCSVExport}
					/>
				</ButtonGroup>
				<DialogFooter>
					<Button type="submit" onClick={handleExport}>
						{t('button')}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
