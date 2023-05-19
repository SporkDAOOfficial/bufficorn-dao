import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': {
        NX_RIVET_KEY: process.env.VITE_RIVET_KEY,
        NX_GRAPH_API_KEY_MAINNET: process.env.VITE_GRAPH_API_KEY_MAINNET,
        NX_ETHERSCAN_KEY: process.env.VITE_ETHERSCAN_KEY,
        NX_POLYGONSCAN_KEY: process.env.VITE_POLYGONSCAN_KEY,
        NX_TARGET_KEY: process.env.VITE_TARGET_KEY,
        NX_GNOSISSCAN_KEY: process.env.VITE_GNOSISSCAN_KEY,
        NODE_ENV: '16.6.0',
      },
    },
  });
};
