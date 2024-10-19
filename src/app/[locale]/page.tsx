'use client';

import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Sidebar } from '@/components/layout/Sidebar';
import { LangToggle } from '@/components/lang/LangToggle';
import { Toolbox } from '@/components/layout/Toolbox';
import { Scene } from '@/components/3d/Scene';

export default function Home() {
	return (
		<main className="h-screen bg-editorBackground overflow-hidden">
			<div className="h-full flex flex-col overflow-hidden">
				<Scene />
				<Sidebar />
			</div>
			<Toolbox />
			<div className="absolute right-4 bottom-[calc(50%-5%)] lg:bottom-4 flex gap-4">
				<LangToggle />
				<ThemeToggle />
			</div>
		</main>
	);
}
