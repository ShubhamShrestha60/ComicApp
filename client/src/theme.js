export const theme = {
  colors: {
    background: '#1A1A2E',
    secondary: '#16213E',
    primary: '#E94560',
    text: '#FFFFFF',
    accent: '#0F3460',
  },
  fonts: {
    primary: '"Bangers", "Comic Neue", cursive',
    secondary: '"Comic Neue", cursive',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.2)',
    large: '0 8px 16px rgba(0, 0, 0, 0.3)',
    text: '2px 2px 0 #000',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #E94560 0%, #0F3460 100%)',
    secondary: 'linear-gradient(135deg, #16213E 0%, #1A1A2E 100%)',
  },
  animations: {
    fastFade: '0.3s ease-in-out',
    slowFade: '0.5s ease-in-out',
    bounce: '0.5s cubic-bezier(0.36, 0, 0.66, -0.56)',
    slideIn: '0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
};

export const colorBlindThemes = {
  none: {
    colors: {
      background: '#222831',
      secondary: '#393E46',
      primary: '#00ADB5',
      text: '#EEEEEE',
    },
    fonts: {
      primary: '"Nunito", sans-serif',
    },
    breakpoints: {
      mobile: '320px',
      tablet: '768px',
      desktop: '1024px',
    },
  },
  protanopia: {
    colors: {
      background: '#23272A',
      secondary: '#3A3F44',
      primary: '#1E90FF', // blue
      text: '#F5F5F5',
    },
    fonts: {
      primary: '"Nunito", sans-serif',
    },
    breakpoints: {
      mobile: '320px',
      tablet: '768px',
      desktop: '1024px',
    },
  },
  deuteranopia: {
    colors: {
      background: '#23272A',
      secondary: '#3A3F44',
      primary: '#FFD700', // yellow
      text: '#F5F5F5',
    },
    fonts: {
      primary: '"Nunito", sans-serif',
    },
    breakpoints: {
      mobile: '320px',
      tablet: '768px',
      desktop: '1024px',
    },
  },
  tritanopia: {
    colors: {
      background: '#23272A',
      secondary: '#3A3F44',
      primary: '#FF6347', // tomato
      text: '#F5F5F5',
    },
    fonts: {
      primary: '"Nunito", sans-serif',
    },
    breakpoints: {
      mobile: '320px',
      tablet: '768px',
      desktop: '1024px',
    },
  },
};