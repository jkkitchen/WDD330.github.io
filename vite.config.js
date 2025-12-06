import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    root: "src/",

    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                swimmer_profiles: resolve(__dirname, "src/public/swimmer-profiles.html"),
                register: resolve(__dirname, "src/public/register.html"),
                state_cuts: resolve(__dirname, "src/public/state-cuts.html")
            },
        },
    },
});