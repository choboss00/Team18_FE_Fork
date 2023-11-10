import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// HTTPS 관련 설정 추가
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("cert/localhost-key.pem"),
      cert: fs.readFileSync("cert/localhost.pem"),
    },
  },
});
