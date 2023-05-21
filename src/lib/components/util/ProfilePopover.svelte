<script>
    // components
    import ThemeSwitcher from "./ThemeSwitcher.svelte";
    import LogoutButton from "../auth/LogoutButton.svelte";
</script>

<div
    class="card compact dropdown-content bg-neutral shadow rounded-box w-64 border"
>
    <div class="card-body">
        <h4 class="m-2 text-neutral-content">Choose your theme:</h4>
        <ThemeSwitcher />
        <div class="divider before:bg-primary after:bg-primary my-0 before:opacity-50 after:opacity-50"></div>
        <LogoutButton />
    </div>
</div>

<style>
</style>
