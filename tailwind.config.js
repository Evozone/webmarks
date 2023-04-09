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
                    primary: "#A855F7",
                    secondary: "#3B82F6",
                    accent: "#f59e0b",
                    neutral: "#f3f4f6",
                    "base-100": "#f0abfc",
                },
            },
            "light",
            "dark",
            "cupcake",
            "lemonade",
        ],
    },
};
