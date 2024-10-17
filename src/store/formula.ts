import { create } from 'zustand';

interface FormulaState {
	equation: string;
	equationX: string;
	equationY: string;
	equationZ: string;
	setEquation: (equation: string, axis?: string) => void;
	getEquation: (axis?: string) => string;
}

export const useFormulaStore = create<FormulaState>()((set, get) => ({
	equation: '$f(x, y) = x^2 + y^2$',
	equationX: '$f(u, v) = cos(u) * (a + b*cos(v))$',
	equationY: '$f(u, v) = sin(u) * (a + b*cos(v))$',
	equationZ: '$f(u, v) = b * sin(v)$',
	setEquation: (equation, axis) => {
		if (axis) {
			set({ [`equation${axis.toUpperCase()}`]: `$${equation}$` });
		} else {
			set({ equation: `$${equation}$` });
		}
	},
	getEquation: (axis) => {
		if (axis) {
			const key = `equation${axis.toUpperCase()}` as keyof FormulaState;
			return (get()[key] as string).replace(/\$/g, '');
		}
		return get().equation.replace(/\$/g, '');
	},
}));
