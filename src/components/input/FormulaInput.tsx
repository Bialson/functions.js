import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Axis } from '@/lib/math/types';
import { useFormulaStore } from '@/store/formula';
import { useShallow } from 'zustand/react/shallow';
import { useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Latex from 'react-latex-next';
import { useDebouncedCallback } from 'use-debounce';
import { extractMathFormula } from '@/lib/math';

type FormulaInputProps = {
	isParametric?: boolean;
	axis?: Axis;
};

export const FormulaInput: React.FC<FormulaInputProps> = ({
	isParametric,
	axis,
}) => {
	const t = useTranslations('math.formula');

	const inputRef = useRef<HTMLInputElement>(null);

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

	const formulaValue = useMemo(() => {
		let value: string;

		switch (axis) {
			case 'x':
				value = equationX;
				break;
			case 'y':
				value = equationY;
				break;
			case 'z':
				value = equationZ;
				break;
			default:
				value = equation;
				break;
		}

		if (inputRef.current) {
			inputRef.current.value = extractMathFormula(value);
		}

		return value;
	}, [equation, equationX, equationY, equationZ, axis]);

	const handleChange = useDebouncedCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			setEquation(value, axis);
		},
		150,
	);

	const latexFormula = useMemo(() => {
		return (
			`${axis ? 'f(u, v)' : 'f(x, y)'} = ` +
			formulaValue.replaceAll('$', '')
		);
	}, [axis, formulaValue]);

	return (
		<div className="flex flex-col gap-4">
			<Label htmlFor={inputId}>
				{axis ? t(`equation${axis.toUpperCase()}`) : t('equation')}
			</Label>
			<Input
				ref={inputRef}
				type="text"
				defaultValue={defaultValue}
				placeholder={INPUT_PLACEHOLDER}
				id={inputId}
				onChange={handleChange}
			/>
			{defaultValue.length > 0 && (
				<div className="flex flex-wrap items-center justify-center">
					<Latex>{`$${latexFormula}$`}</Latex>
				</div>
			)}
		</div>
	);
};
