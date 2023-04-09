<script>
    import { onMount } from "svelte";
    import { themeChange } from "theme-change";

    // Icons
    import Icon from "svelte-icons-pack/Icon.svelte";
    import BsFlower1 from "svelte-icons-pack/bs/BsFlower1";

    // Store
    import { selectedTheme } from "../../stores";

    let theme = window.localStorage.getItem("theme") || "default";

    onMount(() => {
        themeChange(false);
        // 👆 false parameter is required for svelte
        $selectedTheme = theme;
    });

    const themes = {
        default: {
            name: "default",
            icon: "🌼",
            displayName: "Default",
        },
        light: {
            name: "light",
            icon: "🌞",
            displayName: "Light",
        },
        dark: {
            name: "dark",
            icon: "🌙",
            displayName: "Dark",
        },
        cupcake: {
            name: "cupcake",
            icon: "🧁",
            displayName: "Cupcake",
        },
        lemonade: {
            name: "lemonade",
            icon: "🍋",
            displayName: "Lemonade",
        },
    };

    const handleChangeTheme = (e) => {
        const newTheme = e.target.value;
        theme = newTheme;
    };
</script>

<div class="flex flex-row items-center">
    <div class="p-2">{themes[theme].icon}</div>

    <!-- Select theme -->
    <div class="grow">
        <select
            data-choose-theme
            class="select select-primary w-full"
            value={theme}
            on:change={handleChangeTheme}
        >
            <!-- <option value="lavender">Lavender</option> -->
            <!-- iterate over all themes -->
            {#each Object.keys(themes) as themeKey}
                <option value={themeKey}>{themes[themeKey].displayName}</option>
            {/each}
        </select>
    </div>
</div>

<style>
</style>
