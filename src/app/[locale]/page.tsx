'use client';

import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useTranslations } from 'next-intl';
import { Sidebar, Sider } from '@/components/layout/Sidebar';

export default function Home() {
	const t = useTranslations('Home');

	return (
		<main className="h-svh flex bg-editorBackground">
			<Sidebar />

			<ThemeToggle />
		</main>
	);
}
