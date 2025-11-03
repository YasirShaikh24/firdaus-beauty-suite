import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon-32x32.png', 'icon-192x192.png', 'icon-512x512.png'],
      manifest: {
        name: 'Firdaus Makeover',
        short_name: 'Firdaus',
        description: 'Premium Beauty Parlor - Where Beauty Meets Elegance',
        theme_color: '#f7d9e3',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          }
        ],
        categories: ['beauty', 'lifestyle', 'shopping'],
        shortcuts: [
          {
            name: 'Book Appointment',
            short_name: 'Book',
            description: 'Book your beauty appointment',
            url: '/contact',
            icons: [{ src: '/icon-192x192.png', sizes: '192x192' }]
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
