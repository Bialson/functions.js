'use client';

import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Sidebar } from '@/components/layout/Sidebar';
import { LangToggle } from '@/components/lang/LangToggle';
import { Toolbox } from '@/components/layout/Toolbox';
import { Scene } from '@/components/3d/Scene';

export default function Home() {
	return (
		<main className="h-svh bg-editorBackground">
			<Scene />
			<Sidebar />
			<Toolbox />
			<LangToggle />
			<ThemeToggle />
		</main>
	);
}
