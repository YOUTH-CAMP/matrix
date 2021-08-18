import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import lessToJS from "less-vars-to-js";
import * as path from "path";
import * as fs from "fs";

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./config/variables.less"), "utf8")
);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: themeVariables,
      },
    },
  },
});
