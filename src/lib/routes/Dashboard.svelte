<script>
    // Imports
    import LogoutButton from "../components/LogoutButton.svelte";

    export let location;
</script>

<div>
    <h1>Dashboard</h1>
    <p>Dashboard content goes here</p>

    <LogoutButton />

    <!-- Go to contexts -->
    <a href="/context/123">Go to an example context</a>
</div>

<style>
    /* your styles go here */
</style>
