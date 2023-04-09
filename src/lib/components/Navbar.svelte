<script>
    // Imports
    import LogoutButton from "../components/LogoutButton.svelte";
    import ThemeSwitcher from "../components/ThemeSwitcher.svelte";
    import ProfilePopover from "./ProfilePopover.svelte";

    // Stores
    import { loggedInUser } from "../../stores";

    // Params
    export let path;
</script>

<div class="navbar flex flex-row items-center justify-between p-2">
    <h1 class="text-2xl font-bold text-neutral">WebMarks</h1>

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
                                    {(
                                        $loggedInUser.name ||
                                        $loggedInUser.email
                                    ).charAt(0)}
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
