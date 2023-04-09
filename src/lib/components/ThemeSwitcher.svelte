<script>
    import { onMount } from "svelte";
    import { themeChange } from "theme-change";

    // Store
    import { selectedTheme } from "../../stores";

    let theme = window.localStorage.getItem("theme") || "default";

    onMount(() => {
        themeChange(false);
        // 👆 false parameter is required for svelte
        $selectedTheme = theme;
    });

    const themes = {
        lavender: {
            name: "default",
            displayName: "Lavender",
        },
        light: {
            name: "light",
            displayName: "Light",
        },
        dark: {
            name: "dark",
            displayName: "Dark",
        },
        cupcake: {
            name: "cupcake",
            displayName: "Cupcake",
        },
        lemonade: {
            name: "lemonade",
            displayName: "Lemonade",
        },
    };

    $selectedTheme = themes[0].value;

    const handleChangeTheme = (e) => {
        const newTheme = e.target.value;
        theme = newTheme;
    };
</script>

<div class="flex flex-row items-center" />

<style>
    .theme-switcher {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1000;
    }
</style>
