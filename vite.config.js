import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/sprites')],
      symbolId: 'icon-[dir]-[name]',
      recursive: true,
    }),
  ],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: {
        chrome: 120 << 16,
        firefox: 120 << 16,
        safari: 16 << 16,
        ios_saf: 16 << 16,
        edge: 120 << 16,
      },
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use '/src/styles/base/functions.scss' as *;
                         @use '/src/styles/base/mixins.scss' as *;
                         @use '/src/styles/base/vars.scss' as *;`,
      },
    },
  },
  build: {
    cssMinify: 'lightningcss',
  },
});
