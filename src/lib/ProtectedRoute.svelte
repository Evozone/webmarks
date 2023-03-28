<script>
    import { Route } from "svelte-routing";
    import { loggedInUser } from "../stores";

    import Home from "./routes/Home.svelte";

    export let path;
    export let component;

    $: isAuthenticated = $loggedInUser !== null;
</script>

{#if isAuthenticated}
    <Route {path} {component} />
{:else}
    <Route {path} component={Home} />
{/if}
