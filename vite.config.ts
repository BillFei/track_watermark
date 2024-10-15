import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { loadEnv } from "vite";
import * as path from 'path'
/************************************* 路径配置 start ********************************/
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
const Timestamp= new Date().getTime()


const pathSrc = path.resolve(__dirname, 'src')
const alias: Record<string, string> = {
  '@': pathSrc
}
/************************************* 路径配置 end ********************************/
// https://vitejs.dev/config/
export default defineConfig(({
command,mode
})=>{
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    plugins: [
      vue(),
       AutoImport({
        imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
         // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
     dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
       // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),

    }),

    Icons({
      autoInstall: true,
    }),
  ],

    resolve: {  // ****************** 路径配置新增
      alias  ,   // ****************** 路径配置新增

    }   ,        // ****************** 路径配置新增

    server: {
      proxy: {
        '/api': {
          target: env.VITE_BASE_API,
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // 将请求中/api用空值替换重写，根据实际业务修改
        },
      },
      // host: 'localhost',
			cors: true,
			open: true,
			// hmr: true,
    }
  }
})
