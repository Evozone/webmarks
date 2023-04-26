<script>
    import { onMount } from "svelte";
    import { themeChange } from "theme-change";

    // Icons
    import Icon from "svelte-icons-pack/Icon.svelte";
    import BsFlower1 from "svelte-icons-pack/bs/BsFlower1";
    import BsSunFill from "svelte-icons-pack/bs/BsSunFill";
    import BsMoonFill from "svelte-icons-pack/bs/BsMoonFill";
    import RiOthersCake3Fill from "svelte-icons-pack/ri/RiOthersCake3Fill";
    import BiSolidLemon from "svelte-icons-pack/bi/BiSolidLemon";
    import BsTreeFill from "svelte-icons-pack/bs/BsTreeFill";

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
            displayName: "Default",
            icon: BsFlower1,
        },
        light: {
            name: "light",
            displayName: "Light",
            icon: BsSunFill,
        },
        dark: {
            name: "dark",
            displayName: "Dark",
            icon: BsMoonFill,
        },
        cupcake: {
            name: "cupcake",
            displayName: "Cupcake",
            icon: RiOthersCake3Fill,
        },
        lemonade: {
            name: "lemonade",
            displayName: "Lemonade",
            icon: BiSolidLemon,
        },
        forest: {
            name: "forest",
            displayName: "Forest",
            icon: BsTreeFill,
        },
    };

    const handleChangeTheme = (e) => {
        const newTheme = e.target.value;
        theme = newTheme;
    };
</script>

<div class="flex flex-row items-center justify-center">
    <Icon src={themes[theme].icon} size="24" color="dark" />

    <!-- Select theme -->
    <div class="grow ml-3">
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
