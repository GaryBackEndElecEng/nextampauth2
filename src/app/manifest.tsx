import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Master ultils free tools',
    short_name: 'free tools',
    description: 'make your custom graph, look at populations, find telephone area codes, find bets video games, etc',
    start_url: '/',
    display: 'standalone',
    background_color: 'whitesmoke',
    theme_color: '#1fb6ff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}