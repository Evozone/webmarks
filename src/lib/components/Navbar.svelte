<script>
    // Imports
    import LogoutButton from "../components/LogoutButton.svelte";
    import ThemeSwitcher from "../components/ThemeSwitcher.svelte";
    import ProfilePopover from "./ProfilePopover.svelte";

    // Stores
    import { loggedInUser } from "../../stores";

    // Params
    export let path;

    // Give navbar a solid background if scrolled down
    let scrolled = false;
    window.onscroll = () => {
        scrolled = window.scrollY > 0;
    };
</script>

<div
    class="navbar flex flex-row items-center justify-between p-2 sticky top-0 z-10"
    class:scrolled
>
    <h1 class="text-2xl font-bold text-content-base">WebMarks</h1>

    <div class="flex flex-row items-center justify-center space-x-4">
        <!-- User Name -->
        {#if $loggedInUser && $loggedInUser.name}
            <p class="ml-4 text-lg font-semibold text-content-base">
                Welcome, {$loggedInUser.name}
            </p>
        {/if}

        <!-- Profile Pic dropdown -->
        <div class="dropdown dropdown-end dropdown-hover">
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <label tabindex={0}>
                <button class="btn btn-circle">
                    <div class="avatar placeholder">
                        <div class="rounded-full ring ring-primary">
                            <!-- If loggedInUser is present and the photoUrl is present, then show img else show placeholder -->
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
    </div>
</div>

<style>
    .scrolled {
        background-color: var(--bg-base);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
</style>
