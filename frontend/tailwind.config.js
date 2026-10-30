/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta customizada solicitada
        ghost: '#FAFAFF',          // Branco Ghost White (Fundo principal e superfícies)
        space: {
          DEFAULT: '#2B2D42',      // Cinza Space Indigo (Títulos, texto principal e estrutura)
          dark: '#1E2030',
          muted: '#5F627A',
          border: '#E2E3EB',
        },
        cyan: {
          DEFAULT: '#55868C',      // Dark Cyan (Secundária: badges, links, ícones e foco)
          light: '#EAF1F2',        // Fundo suave de chips e tags
          dark: '#3F676D',
        },
        lemon: {
          DEFAULT: '#CFD11A',      // Lemon Lime (Acentos vibrantes e destaques de atenção)
          bg: '#FCFDE3',           // Fundo suave para contraste de leitura
          dark: '#858709',         // Versão para textos garantindo acessibilidade WCAG
        },
        forest: {
          DEFAULT: '#053B06',      // Black Forest (Identidade UFLA, valores e botão WhatsApp)
          hover: '#0A520C',
          light: '#E8F1E9',        // Fundo de destaque de preços
        },
      },
    },
  },
  plugins: [],
};
