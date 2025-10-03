// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'mpa',
  
  base: '/',                    
  resolve: {
    alias: {
      // Keep these ONLY if you actually import them in your JS:
      // import 'bootstrap-css'; import 'bootstrap-js';
      'bootstrap-css': '/node_modules/bootstrap/dist/css/bootstrap.min.css',
      'bootstrap-js': '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
        login: resolve(__dirname, './auth/login/index.html'),
        auth: resolve(__dirname, './auth/index.html'),
        register: resolve(__dirname, './auth/register/index.html'),
        profile: resolve(__dirname, './profile/index.html'),
        post: resolve(__dirname, './post/index.html'),
        editPost: resolve(__dirname, './post/edit/index.html'),
        createPost: resolve(__dirname, './post/manage/index.html'),
      },
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: ({ name }) =>
          /\.(css)$/.test(name ?? '') ? 'css/[name]-[hash][extname]' : 'assets/[name]-[hash][extname]',
      },
    },
  },
});

