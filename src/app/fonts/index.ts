import { cn } from '@/lib/utils';
import localFont from 'next/font/local';

const satoshiBlack = localFont({
	src: './Satoshi-Black.otf',
	variable: '--font-satoshi-black',
	weight: '900',
});

const satoshiBold = localFont({
	src: './Satoshi-Bold.otf',
	variable: '--font-satoshi-bold',
	weight: '700',
});

const satoshiRegular = localFont({
	src: './Satoshi-Regular.otf',
	variable: '--font-satoshi-regular',
	weight: '400',
});

const satoshiMedium = localFont({
	src: './Satoshi-Medium.otf',
	variable: '--font-satoshi-medium',
	weight: '500',
});

const satoshiLight = localFont({
	src: './Satoshi-Light.otf',
	variable: '--font-satoshi-light',
	weight: '300',
});

export const fontsVariables = cn(
	satoshiLight.variable,
	satoshiRegular.variable,
	satoshiMedium.variable,
	satoshiBold.variable,
	satoshiBlack.variable,
);
