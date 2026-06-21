import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'node:path';
import legacy from '@vitejs/plugin-legacy';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const myTargets = [
  'chrome >= 109',
  'edge >= 109',
  'firefox >= 115',
  'opera >= 95',
  'safari >= 15.6',
  'ios_saf >= 15.6',
];

export default defineConfig({
  plugins: [
    cssInjectedByJsPlugin(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/sprites')],
      symbolId: 'icon-[dir]-[name]',
      recursive: true,
    }),
    legacy({
      targets: myTargets,
      modernPolyfills: false,
    }),
  ],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist(myTargets)),
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
