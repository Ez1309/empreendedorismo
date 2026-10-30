import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Tema Oficial Acomoda UFLA:
 * - Modo Claro: Banner e Footer em Verde UFLA (#006B3E), Fundo Ghost White (#FAFAFF) e Cards Brancos (#FFFFFF)
 * - Modo Escuro: Base em Space Indigo (#1B1C2A / #2B2D42) com acentos em VERDE PASTEL AVELUDADO (#8FD1A8 / #A3D9B5) - sem neon e sem colisão de tons escuros!
 */
export const TEMA_BASE = {
  light: {
    isDark: false,
    bg: '#FAFAFF',              // Ghost White
    cardBg: '#FFFFFF',          // Branco
    headerBg: '#FFFFFF',
    heroBg: '#006B3E',          // Verde UFLA clássico no banner
    heroText: '#FFFFFF',
    heroSubtext: '#D1EAD9',
    heroAccent: '#A8CF45',      // Verde claro universitário
    footerBg: '#006B3E',        // Mesma cor do banner
    footerText: '#FFFFFF',
    footerSubtext: '#CBE5D4',
    text: '#19261E',            // Texto escuro nítido
    subtext: '#4D6154',
    border: '#D5E5DC',
    primary: '#006B3E',         // Verde UFLA
    primaryHover: '#005230',
    primaryText: '#FFFFFF',
    secondary: '#2E7D32',
    secondaryBg: '#E8F5E9',
    secondaryText: '#006B3E',
    accent: '#A8CF45',
    accentBg: '#F1F8E3',
    accentText: '#3B5905',
    whatsappBtn: '#006B3E',
    whatsappText: '#FFFFFF',
  },
  dark: {
    isDark: true,
    bg: '#171825',              // Space Indigo Noturno Profundo
    cardBg: '#23253A',          // Space Indigo nos cards (substitui o branco)
    headerBg: '#171825',
    
    // No Dark Mode: o Hero e o Footer se integram elegantemente ao Space Indigo, 
    // usando o Verde Pastel como iluminação suave (sem choque pesado de verde escuro vs indigo)
    heroBg: '#1F2136',          
    heroText: '#FAFAFF',
    heroSubtext: '#A7B6C8',
    heroAccent: '#8FD1A8',      // VERDE PASTEL suave e agradável (não neon!)
    footerBg: '#1F2136',        // Integrado ao hero
    footerText: '#FAFAFF',
    footerSubtext: '#98A5B6',
    
    text: '#FAFAFF',            // Ghost White
    subtext: '#9AA0B8',         // Cinza-indigo suave para leitura confortável
    border: '#33364F',          // Borda sutil de contorno
    
    // Verde Pastel Suave para os botões e destaques
    primary: '#78C295',         // Verde Pastel Aveludado
    primaryHover: '#8FD1A8',
    primaryText: '#151722',     // Texto escuro legível sobre o verde pastel
    
    secondary: '#8FD1A8',
    secondaryBg: '#22322A',     // Fundo verde pastel translúcido escuro
    secondaryText: '#A3D9B5',   // Verde pastel claro
    
    accent: '#8FD1A8',
    accentBg: '#24342A',
    accentText: '#A3D9B5',
    
    whatsappBtn: '#4A9C6D',     // Verde pastel encorpado para o botão de WhatsApp
    whatsappText: '#FFFFFF',
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('acomoda_dark_mode') === 'true';
  });

  const [layoutMode, setLayoutMode] = useState(() => {
    return localStorage.getItem('acomoda_view_mode') || 'grid';
  });

  const tema = isDarkMode ? TEMA_BASE.dark : TEMA_BASE.light;

  useEffect(() => {
    localStorage.setItem('acomoda_dark_mode', isDarkMode);
    document.body.style.backgroundColor = tema.bg;
    document.body.style.color = tema.text;
  }, [isDarkMode, tema]);

  useEffect(() => {
    localStorage.setItem('acomoda_view_mode', layoutMode);
  }, [layoutMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ tema, isDarkMode, toggleDarkMode, layoutMode, setLayoutMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
}
