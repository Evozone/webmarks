<script>
    // components
    import ThemeSwitcher from "./ThemeSwitcher.svelte";
    import LogoutButton from "./LogoutButton.svelte";
</script>

<div
    class="card compact dropdown-content shadow bg-base-100 rounded-box w-64 border border-accent"
>
    <div class="card-body">
        <div class="prose">
            <h4 class="m-2">Choose your theme:</h4>
            <ThemeSwitcher />
        </div>
        <LogoutButton />
    </div>
</div>

<style>
    /* your styles go here */
</style>
