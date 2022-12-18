// External dependencies
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// Load environment variables
const envPath: string = '../../';
import { config } from 'dotenv';
config({
	path: `${envPath}.env`
});

export default defineConfig({
	server: {
		port: Number(process.env.CLIENT_PORT) || 3000,
		strictPort: true
	},
	plugins: [
		react(),
		svgr({
			exportAsDefault: true
		})
	],
	build: {
		outDir: './dist'
	},
	envDir: envPath,
	envPrefix: 'PUB_',
	resolve: {
		alias: {
			$src: `${__dirname}/src`,
			_packages: `${__dirname}/../../packages`
		}
	}
});
