export interface Theme {
    name: string;
    colors: {
      background: string; // Now supports gradients
      text: string;
      primary: string;
      primaryText: string;
      secondary: string;
      accent: string;
      accentHover: string;
      bubbleUser: string;
      bubbleAi: string;
      cardBg: string;
      cardBorder: string;
      cardBorderHover: string; // New property for hover effect
    };
  }
  
  export const themes: Record<string, Theme> = {
    default: {
      name: 'Default',
      colors: {
        background: 'bg-gradient-to-br from-slate-900 to-slate-950',
        text: 'text-slate-200',
        primary: 'text-cyan-400',
        primaryText: 'text-white',
        secondary: 'bg-slate-800',
        accent: 'bg-cyan-600',
        accentHover: 'hover:bg-cyan-700',
        bubbleUser: 'bg-cyan-600',
        bubbleAi: 'bg-slate-700',
        cardBg: 'bg-slate-800/50',
        cardBorder: 'border-slate-700',
        cardBorderHover: 'hover:border-cyan-400',
      }
    },
    eva: {
      name: 'Eva',
      colors: {
        background: 'bg-gradient-to-br from-rose-950 to-gray-900',
        text: 'text-rose-100',
        primary: 'text-rose-400',
        primaryText: 'text-white',
        secondary: 'bg-rose-900/50',
        accent: 'bg-rose-600',
        accentHover: 'hover:bg-rose-700',
        bubbleUser: 'bg-rose-600',
        bubbleAi: 'bg-rose-900/70',
        cardBg: 'bg-rose-900/40',
        cardBorder: 'border-rose-800/50',
        cardBorderHover: 'hover:border-rose-400',
      }
    },
    luna: {
      name: 'Luna',
      colors: {
        background: 'bg-gradient-to-br from-violet-950 to-gray-900',
        text: 'text-violet-100',
        primary: 'text-violet-400',
        primaryText: 'text-white',
        secondary: 'bg-violet-900/50',
        accent: 'bg-violet-600',
        accentHover: 'hover:bg-violet-700',
        bubbleUser: 'bg-violet-600',
        bubbleAi: 'bg-violet-900/70',
        cardBg: 'bg-violet-900/40',
        cardBorder: 'border-violet-800/50',
        cardBorderHover: 'hover:border-violet-400',
      }
    },
    james: {
      name: 'James',
      colors: {
        background: 'bg-gradient-to-br from-sky-950 to-gray-900',
        text: 'text-sky-100',
        primary: 'text-sky-400',
        primaryText: 'text-white',
        secondary: 'bg-sky-900/50',
        accent: 'bg-sky-600',
        accentHover: 'hover:bg-sky-700',
        bubbleUser: 'bg-sky-600',
        bubbleAi: 'bg-sky-900/70',
        cardBg: 'bg-sky-900/40',
        cardBorder: 'border-sky-800/50',
        cardBorderHover: 'hover:border-sky-400',
      }
    }
  };