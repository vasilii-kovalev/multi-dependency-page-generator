import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "hooks/": "/src/hooks/",
      "mocks/": "/src/mocks/",
      "models/": "/src/models/",
      "pages/": "/src/pages/",
      "services/": "/src/services/",
      "types/": "/src/types/",
      "utils/": "/src/utils/",
    },
  },
});
