// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules:[
        '@nuxtjs/tailwindcss',
        '@nuxtjs/eslint-module'
    ],
    css: [
        '@/assets/css/main.css',
        "@/assets/css/posts/graphes_grids.scss",
        "@/assets/css/posts/graphes_connections.scss",
        "@/assets/css/posts/polygons.scss",
        "@/assets/css/posts/grid_selector.scss",
        "@/assets/css/posts/shape_interceptions.scss",
        "@/assets/css/obsidian.css"
    ],
    app:{
        head:{
            script:[
                {
                    src:"/scripts/MathJaxPre.js",
                    async:false,
                    fetchpriority: "high"
                },
                {
                    src:"https://polyfill.io/v3/polyfill.min.js?features=es6",
                    async:false,
                    fetchpriority: "high"
                },
                {
                    id:"MathJax-script",
                    src:"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
                    async:true,
                    fetchpriority: "high"
                }
            ]
        }
    },
    plugins:[
        {
            src:"@/plugins/mathjax.js",
            mode:"client"
        }
    ]
});

