<script>
    import { Route, navigate } from "svelte-routing";
    import { user } from "../stores";

    import Home from "./routes/Home.svelte";

    export let path;
    export let component;

    $: isAuthenticated = $user;
</script>

{#if isAuthenticated}
    <Route {path} {component} />
{:else}
    <Route {path} component={Home} />
{/if}
