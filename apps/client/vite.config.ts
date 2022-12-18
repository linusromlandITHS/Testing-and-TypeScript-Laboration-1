// External dependencies
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
const envPath: string = '../../';
import { config } from 'dotenv';
config({
	path: `${envPath}.env`
});

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: Number(process.env.CLIENT_PORT) || 3000,
		strictPort: true
	},
	plugins: [react()],
	build: {
		outDir: './dist'
	},
	envDir: envPath,
	envPrefix: 'PUB_'
});
