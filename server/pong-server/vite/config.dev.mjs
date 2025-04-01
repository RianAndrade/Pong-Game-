import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        react(),
    ],
    server: {
        port: 5000,
        allowedHosts: 'ec2-3-148-234-148.us-east-2.compute.amazonaws.com'
    }
})
