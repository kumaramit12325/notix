import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        allowedHosts: true,
        origin: process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}:5173` : 'http://localhost:5173',
        cors: {
            origin: '*',
            credentials: true,
        },
        hmr: {
            protocol: process.env.REPLIT_DEV_DOMAIN ? 'wss' : 'ws',
            host: process.env.REPLIT_DEV_DOMAIN || 'localhost',
            port: 5173,
        },
        watch: {
            ignored: [
                '**/vendor/**',
                '**/storage/**',
                '**/node_modules/**',
                '**/.cache/**',
                '**/.local/**',
                '**/.replit',
                '**/.config/**',
            ],
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js'),
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});
