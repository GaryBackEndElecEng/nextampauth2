import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        primary: {
          100: "#b2d8d8",
          200: "#66b2b2",
          300: "#74B3CE",
          400: "#ee7600",
          500: "#d56900",
          600: "#008080",
          700: "#a25000",
          800: "#004c4c",
          900: "#172A3A",
        },
        secondary: {
          100: "##ff9c3c",
          200: "#ff9022",
          300: "#ff8308",
          400: "#ee7600",
          500: "#d56900",
          600: "#bb5d00",
          700: "#a25000",
          800: "#5f2f00",
          900: "#472300",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          "gradient-footer":"linear-gradient(to bottom,var(--site-blue-light) 30%,#0020C2)",
      },
      boxShadow:{
        "big-white":"1px 1px 20px 1px white",
        "big-1":"1px 1px 20px 2px #172A3A",
        "big-2":"1px 1px 20px 2px #004346",
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        "big-3":"1px 1px 20px 2px #004346,-1px -1px 20px 2px #004346"
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
        xs:'275px',
        tablet:"640px",
        laptop:"1024px",
        desktop:"1280px"
        
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
