// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://my.yado1225.top',
  trailingSlash: 'ignore',
  server: { port: 3000, host: true },
  // 悬停即预取下一页，配合跨文档视图过渡，切页几乎无等待
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
});
