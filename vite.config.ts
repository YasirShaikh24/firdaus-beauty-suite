import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path'; // <--- Import 'path' module

// Define your PWA manifest configuration for Firdaus Makeover
const manifestForPlugin = {
  registerType: 'autoUpdate' as const,
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: "Firdaus Makeover",
    short_name: "F. Makeover",
    description: "Where Beauty Meets Elegance. Makeup and Salon Services.",
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    theme_color: '#984B8E', // Based on primary color from src/index.css
    background_color: '#FAF6F6', // Based on background color from src/index.css
    display: "standalone" as const,
    scope: '/',
    start_url: "/",
    orientation: 'portrait' as const
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [
    react(),
    // Include VitePWA to fix the previous issue (if not already installed, install it: npm install vite-plugin-pwa -D)
    VitePWA(manifestForPlugin) 
  ],
  resolve: {
    // THIS SECTION FIXES THE ALIAS RESOLUTION ERROR
    alias: {
      '@': path.resolve(__dirname, './src'), // Maps '@/' to the 'src' directory
    },
  },
});