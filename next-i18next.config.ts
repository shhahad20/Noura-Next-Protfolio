import { resolve } from 'path';
import type { UserConfig } from 'next-i18next';

const nextI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
  },
  localePath: typeof window === 'undefined' 
    ? resolve('./public/locales') 
    : '/locales',
};

export default nextI18NextConfig;
