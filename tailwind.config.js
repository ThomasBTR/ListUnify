/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'tertiary-fixed-dim': '#ef9e5d',
        'on-primary-fixed': '#324431',
        'on-secondary': '#fff8f1',
        'tertiary-fixed': '#ffab69',
        'on-secondary-fixed-variant': '#665a43',
        'surface-container-highest': '#e3e3dc',
        'surface-container-low': '#f5f4ef',
        'surface-container-lowest': '#ffffff',
        'surface-dim': '#dadad4',
        'tertiary': '#8f4f14',
        'on-background': '#31332f',
        'primary-fixed-dim': '#c5dac0',
        'error-container': '#fd795a',
        'primary-dim': '#465843',
        'secondary': '#6a5e46',
        'inverse-primary': '#e7fde1',
        'inverse-on-surface': '#9e9d99',
        'surface-bright': '#fbf9f5',
        'tertiary-dim': '#804307',
        'primary-fixed': '#d3e8ce',
        'on-secondary-container': '#5c503a',
        'tertiary-container': '#ffab69',
        'background': '#fbf9f5',
        'surface': '#fbf9f5',
        'on-secondary-fixed': '#493e29',
        'on-tertiary-fixed': '#3e1d00',
        'surface-container': '#efeee9',
        'on-error-container': '#6e1400',
        'outline': '#7a7b76',
        'surface-tint': '#51644f',
        'on-tertiary-fixed-variant': '#6a3500',
        'on-surface-variant': '#5e605b',
        'secondary-dim': '#5d523b',
        'on-tertiary-container': '#5d2e00',
        'surface-variant': '#e3e3dc',
        'error': '#a73b21',
        'secondary-fixed': '#f2e0c3',
        'on-primary': '#eaffe4',
        'on-error': '#fff7f6',
        'primary-container': '#d3e8ce',
        'on-surface': '#31332f',
        'primary': '#51644f',
        'outline-variant': '#b2b2ad',
        'secondary-container': '#f2e0c3',
        'inverse-surface': '#0e0e0d',
        'on-primary-container': '#445642',
        'secondary-fixed-dim': '#e3d2b5',
        'error-dim': '#791903',
        'surface-container-high': '#e9e8e3',
        'on-tertiary': '#fff7f4',
        'on-primary-fixed-variant': '#4e604b'
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px'
      },
      fontFamily: {
        headline: ['PlusJakartaSans_800ExtraBold'],
        'headline-bold': ['PlusJakartaSans_700Bold'],
        'headline-semibold': ['PlusJakartaSans_600SemiBold'],
        body: ['Inter_400Regular'],
        'body-medium': ['Inter_500Medium'],
        'body-semibold': ['Inter_600SemiBold']
      },
      boxShadow: {
        ambient: '0 12px 32px rgba(81,100,79,0.06)',
        'ambient-top': '0 -12px 32px rgba(81,100,79,0.06)'
      }
    }
  },
  plugins: []
};
