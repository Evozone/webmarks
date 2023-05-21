<script>
    import { onMount } from "svelte";

    // Components
    import LogoutButton from "../auth/LogoutButton.svelte";
    import ThemeSwitcher from "./ThemeSwitcher.svelte";
    import ProfilePopover from "./ProfilePopover.svelte";

    // Stores
    import { loggedInUser } from "../../../stores";

    // Params
    export let contextName = null;

    // Javascript variables
    let scrolled = false;

    // On mount check if the page has an offset
    // If the page has an offset, then add the scrolled class to the navbar
    onMount(() => {
        if (window.pageYOffset > 0) {
            scrolled = true;
        }

        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 0) {
                scrolled = true;
            } else {
                scrolled = false;
            }
        });
    });
</script>

<div
    class="navbar flex flex-row items-center bg-neutral justify-between p-2 sticky top-0 z-10"
    class:scrolled
>
    <!-- Brand -->
    <h1 class="text-2xl font-bold text-white">
        <img src="/logo.svg" alt="Webmarks Logo" width="40" />
        &nbsp; WebMarks
    </h1>

    <!-- Breadcrumbs -->
    <div class="text-sm breadcrumbs text-primary-content absolute left-1/2 transform -translate-x-1/2" >
        <ul>
            <!-- Show Dashboard and Context (if in a context) -->
            <li>
                <a href="/dashboard" class="text-white">Dashboard</a>
            </li>
            {#if contextName}
                <li>
                    <a href="/context/{contextName}" class="text-white">
                        {contextName}
                    </a>
                </li>
            {/if}
        </ul>
    </div>

    <!-- User info -->
    <div class="flex flex-row items-center justify-center space-x-4">
        <!-- User Name -->
        {#if $loggedInUser && $loggedInUser.name}
            <p class="ml-4 text-lg font-semibold text-white">
                Welcome, {$loggedInUser.name}
            </p>
        {/if}

        <!-- Profile Pic dropdown -->
        <div class="dropdown dropdown-end">
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <label tabindex={0}>
                <button class="btn btn-circle">
                    <div class="avatar placeholder">
                        <div class="rounded-full ring ring-primary h-10">
                            {#if $loggedInUser && $loggedInUser.picture}
                                <img 
                                    src={$loggedInUser.picture}
                                    alt={$loggedInUser.name}
                                />
                            {:else}
                                <span class="text-xl font-bold">
                                    {#if $loggedInUser}
                                        {$loggedInUser.name.charAt(0)}
                                    {/if}
                                </span>
                            {/if}
                        </div>
                    </div>
                </button>
            </label>

            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <div tabindex={0} class="dropdown-content">
                <ProfilePopover />
            </div>
        </div>
        <!-- Profile Pic -->
    </div>
</div>

<style>
    /* change the color of all children of breadcrumbs */
    .breadcrumbs * {
        color: #fff;
    }
</style>
