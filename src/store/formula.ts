import { create } from 'zustand';

interface FormulaState {
	formula: string;
	equationX: string;
	equationY: string;
	equationZ: string;
	setEquation: (equation: string, axis?: string) => void;
	getEquation: (axis?: string) => string;
}

export const useFormulaStore = create<FormulaState>()((set, get) => ({
	formula: '$f(x, y) = x^2 + y^2$',
	equationX: '',
	equationY: '',
	equationZ: '',
	setEquation: (equation, axis) => {
		const latexEquation = `$${equation}$`;
		set({ [`equation${axis}`]: latexEquation });
	},
	getEquation: (axis) => {
		if (axis) {
			return get()[`equation${axis.toUpperCase()}`].replace(/\$/g, '');
		}
		return get().formula.replace(/\$/g, '');
	},
}));
