/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                default: {
                    primary: "#3b82f6",
                    secondary: "#93c5fd",
                    accent: "#f59e0b",
                    neutral: "#f3f4f6",
                    "base-100": "#e9d5ff",
                },
            },
            "light",
            "dark",
            "cupcake",
            "lemonade",
            "forest",
        ],
    },
};
