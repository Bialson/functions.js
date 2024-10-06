'use client';

import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useTranslations } from 'next-intl';

export default function Home() {
	const t = useTranslations('Home');

	return (
		<main className="p-4 h-svh flex">
			<div className="p-8 w-fit h-full  bg-gray-900 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-700 self-end ml-auto">
				<h1 className="text-xl font-normal">{t('Title')}</h1>
				<ThemeToggle />
			</div>
		</main>
	);
}
