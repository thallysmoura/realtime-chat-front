/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        slideIn: {
            '0%': { transform: 'translateY(30%)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
          slideIn: 'slideIn 0.2s ease-out',
      },

      colors: {
          primary: '#1B75E9', // Azul mais intenso
          secondary: '#10B981', // Verde vibrante
          danger: '#DC2626', // Vermelho intenso
          warning: '#F59E0B', // Laranja quente
          textDefault: '#1F2937', // Cinza escuro
          success: '#D1FAE5', // Verde claro
          info: '#BFDBFE', // Azul claro
          error: '#FECACA', // Rosa claro
          accent: '#D946EF', // Roxo vibrante
          muted: '#9CA3AF', // Cinza neutro
          background: '#F3F4F6', // Cinza muito claro
          card: '#FFFFFF', // Branco para cards
          border: '#E5E7EB', // Cinza suave para bordas
          cor_vermelha: '#EC1213',
          cor_amarela: '#FFE945',
          cor_verde: '#75AE20',
          opencard_default: '#E3EFFE',
          opencard_check: '#B1E4A9',
          opencard_recusado: '#FFA5A3',

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'custom-gradient': 'linear-gradient(to right, #00264D, #004A91)',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
