<script>
    import { Route } from "svelte-routing";
    import { loggedInUser } from "../stores";

    import Home from "./routes/Home.svelte";

    export let component;

    $: isAuthenticated = $loggedInUser !== null;
</script>

{#if isAuthenticated}
    <svelte:component this={component} />
{:else}
    <svelte:component this={Home} location="/" />
{/if}
