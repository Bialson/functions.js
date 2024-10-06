import type { Metadata } from 'next';
import '../globals.css';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { fontsVariables } from '@/app/fonts';

export const metadata: Metadata = {
	title: 'Functions 3D',
	description: 'Create beautiful 3D functions with ease.',
};

export default async function RootLayout({
	children,
	params: { locale },
}: Readonly<{
	children: React.ReactNode;
	params: { locale: string };
}>) {
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body className={`${fontsVariables} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider
						attribute="class"
						enableSystem
						defaultTheme="system"
					>
						{children}
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
