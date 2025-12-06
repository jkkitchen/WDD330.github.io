import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    root: "src/",

    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                swimmer_profiles: resolve(__dirname, "public/swimmer-profiles.html"),
                register: resolve(__dirname, "public/register.html"),
                state_cuts: resolve(__dirname, "public/state-cuts.html")
            },
        },
    },
});