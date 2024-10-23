import { useDataStore } from '@/store/data';
import { useShallow } from 'zustand/react/shallow';
import { useDebouncedCallback } from 'use-debounce';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Latex from 'react-latex-next';
import { useTranslations } from 'next-intl';

export const ParamInput: React.FC = () => {
	const t = useTranslations('math.params');

	const [aParam, bParam, setParam] = useDataStore(
		useShallow((state) => [state.aParam, state.bParam, state.setParam]),
	);

	const handleChange = useDebouncedCallback(
		(event: React.ChangeEvent<HTMLInputElement>, param: 'a' | 'b') => {
			const value = parseFloat(event.target.value);

			setParam(param, value);
		},
		150,
	);

	return (
		<div className="flex flex-col gap-4 items-center">
			<Label className="w-full">{t('title')}</Label>
			<div className="w-full flex flex-row gap-12">
				<div className="flex flex-row items-center justify-between w-full gap-4">
					<Latex>{`$a$`}</Latex>
					<Input
						id="param-a-value"
						type="number"
						defaultValue={aParam}
						onChange={(event) => handleChange(event, 'a')}
					/>
				</div>
				<div className="flex flex-row items-center justify-between w-full gap-4">
					<Latex>{`$b$`}</Latex>
					<Input
						id="param-b-value"
						type="number"
						defaultValue={bParam}
						onChange={(event) => handleChange(event, 'b')}
					/>
				</div>
			</div>
		</div>
	);
};
