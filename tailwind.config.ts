import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      "red":"#FF0000",
      'blue': '#1fb6ff',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      "white":"rgb(255,255,255)",
      'gray-light': '#d3dce6',
      'site_blue_light':"#74B3CE",
      "site_blue_grey":"#508991",
      "site_blue_dark":"#172A3A",
      "site_green_dark":"#004346",
      "site_mint":"#09BC8A",
      "black":"#2B2118",
      "slate_blue":"#355691",
      "light_marron":"#DB324D",
      "lime_green":"#8AE9C1",
      "sky_blue":"#91A6FF",
      "medium-black":"rgba(0,0,0,0.5)"

    },
    extend: {
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
  plugins: [],
}
export default config
