import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    splitVendorChunkPlugin(),
    VitePWA({
      manifest: {
        "short_name": "PGO Calcz",
        "name": "Pokémon GO Battle Calculator",
        "icons": [
          {
            "src": "favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
          },
          {
            "src": "logo192.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "logo512.png",
            "type": "image/png",
            "sizes": "512x512"
          }
        ],
        // "start_url": ".",
        "display": "standalone",
        "theme_color": "#132E4C",
        "background_color": "#132E4C"
      },
      includeAssets: ['logo.svg', 'favicon.ico', 'logo192.png', 'logo512.png', 'robots.txt'], 
    })
  ],
  // base: '/pgo/',
  server: {
    host: true,
  }
})
