import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Axis } from '@/lib/math/types';
import { useFormulaStore } from '@/store/formula';
import { useShallow } from 'zustand/react/shallow';
import { useMemo } from 'react';

type FormulaInputProps = {
	isParametric?: boolean;
	axis?: Axis;
};

export const FormulaInput: React.FC<FormulaInputProps> = ({
	isParametric,
	axis,
}) => {
	const INPUT_PLACEHOLDER = isParametric ? 'f(u, v) = 0' : 'f(x, y) = 0';

	const inputId = isParametric
		? `param_equation_${axis}`
		: 'formula_equation';

	const [setEquation, getEquation] = useFormulaStore(
		useShallow((state) => [state.setEquation, state.getEquation]),
	);

	const defaultValue = useMemo(() => {
		if (axis) {
			return getEquation(axis);
		}
		return getEquation();
	}, [axis, getEquation]);

	console.log(defaultValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setEquation(value, axis);
	};

	return (
		<div className="flex flex-col gap-1">
			<Label htmlFor={inputId}>
				{axis ? `${axis.toUpperCase()} Equation` : 'Formula'}
			</Label>
			<Input
				type="text"
				defaultValue={defaultValue}
				placeholder={INPUT_PLACEHOLDER}
				id={inputId}
				className="mt-2"
				onChange={handleChange}
			/>
		</div>
	);
};
