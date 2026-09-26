import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hospital.app',
  appName: 'Hospital Management',
  webDir: 'build',
  server: {
    cleartext: true,
    allowNavigation: ['*']
  }
};

export default config;
