<script>
    import { onMount } from 'svelte';
    import { themeChange } from 'theme-change';

    // Icons
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import IoWater from 'svelte-icons-pack/io/IoWater';
    import IoSunny from 'svelte-icons-pack/io/IoSunny';
    import IoMoon from 'svelte-icons-pack/io/IoMoon';
    import RiOthersCake3Fill from 'svelte-icons-pack/ri/RiOthersCake3Fill';
    import BiSolidLemon from 'svelte-icons-pack/bi/BiSolidLemon';
    import BsTreeFill from 'svelte-icons-pack/bs/BsTreeFill';
    import WiSnowflakeCold from 'svelte-icons-pack/wi/WiSnowflakeCold';

    // Store
    import { selectedTheme } from '../../../stores';

    let theme = window.localStorage.getItem('theme') || 'default';

    onMount(() => {
        themeChange(false);
        // 👆 false parameter is required for svelte
        $selectedTheme = theme;
    });

    const themes = {
        corporate: {
            name: 'corporate',
            displayName: 'Default',
            icon: IoSunny,
            color: 'black'
        },
        night: {
            name: 'night',
            displayName: 'Night',
            icon: IoMoon,
            color: 'white'
        },
        cupcake: {
            name: 'cupcake',
            displayName: 'Cupcake',
            icon: RiOthersCake3Fill,
            color: 'black'
        },
        lemonade: {
            name: 'lemonade',
            displayName: 'Lemonade',
            icon: BiSolidLemon,
            color: 'black'
        },
        winter: {
            name: 'winter',
            displayName: 'Winter',
            icon: WiSnowflakeCold,
            color: 'black'
        },
        dracula: {
            name: 'dracula',
            displayName: 'Dracula',
            icon: IoWater,
            color: 'white'
        }
    };

    const handleChangeTheme = (e) => {
        const newTheme = e.target.value;
        theme = newTheme;
    };
</script>

<div class="flex flex-row items-center justify-center bg-base-100 rounded shadow-md pl-3">
    <Icon src={themes[theme].icon} size="24" color={themes[theme].color} />
    <!-- Select theme -->
    <div class="grow my-1 mr-1 ml-3">
        <select
            data-choose-theme
            class="select select-sm select-primary w-full"
            value={theme}
            on:change={handleChangeTheme}
        >
            {#each Object.keys(themes) as themeKey}
                <option value={themeKey}>{themes[themeKey].displayName}</option>
            {/each}
        </select>
    </div>
</div>

<style>
</style>
