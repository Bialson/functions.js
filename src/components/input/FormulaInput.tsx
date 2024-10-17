import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Axis } from '@/lib/math/types';
import { useFormulaStore } from '@/store/formula';
import { useShallow } from 'zustand/react/shallow';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Latex from 'react-latex-next';
import { useDebouncedCallback } from 'use-debounce';

type FormulaInputProps = {
	isParametric?: boolean;
	axis?: Axis;
};

export const FormulaInput: React.FC<FormulaInputProps> = ({
	isParametric,
	axis,
}) => {
	const t = useTranslations('math.formula');

	const INPUT_PLACEHOLDER = isParametric ? 'f(u, v) = 0' : 'f(x, y) = 0';

	const inputId = isParametric
		? `param_equation_${axis}`
		: 'formula_equation';

	const [
		setEquation,
		getEquation,
		equation,
		equationX,
		equationY,
		equationZ,
	] = useFormulaStore(
		useShallow((state) => [
			state.setEquation,
			state.getEquation,
			state.equation,
			state.equationX,
			state.equationY,
			state.equationZ,
		]),
	);

	const defaultValue = useMemo(() => {
		if (axis) {
			return getEquation(axis);
		}
		return getEquation();
	}, [axis, getEquation]);

	const latexFormula = useMemo(() => {
		switch (axis) {
			case 'x':
				return equationX;
			case 'y':
				return equationY;
			case 'z':
				return equationZ;
			default:
				return equation;
		}
	}, [equation, equationX, equationY, equationZ, axis]);

	const handleChange = useDebouncedCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			setEquation(value, axis);
		},
		150,
	);

	return (
		<div className="flex flex-col gap-4">
			<Label htmlFor={inputId}>
				{axis ? t(`equation${axis.toUpperCase()}`) : t('equation')}
			</Label>
			<Input
				type="text"
				defaultValue={defaultValue}
				placeholder={INPUT_PLACEHOLDER}
				id={inputId}
				onChange={handleChange}
			/>
			{defaultValue.length > 0 && <Latex>{`$${latexFormula}$`}</Latex>}
		</div>
	);
};
