import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kopwarung.app',
  appName: 'KopWarung',
  webDir: 'public',
  server: {
    url: 'https://koperasi-digital-delta.vercel.app',
    allowNavigation: ['koperasi-digital-delta.vercel.app'],
    cleartext: true
  }
};

export default config;
