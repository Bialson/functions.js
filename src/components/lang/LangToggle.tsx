'use client';

import * as React from 'react';
import { Languages } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export const LangToggle = () => {
	const t = useTranslations('lang');
	const router = useRouter();

	const changeLang = (lang: 'pl' | 'en') => {
		console.log(lang);
		router.push(`/${lang}`);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				className="focus:outline-none focus-visible:ring-transparent focus-visible:ring-0 absolute right-16 bottom-4"
			>
				<Button variant="outline" size="icon">
					<Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
					<span className="sr-only">Change language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => changeLang('pl')}>
					{t('pl')}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => changeLang('en')}>
					{t('en')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
