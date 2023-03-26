<script>
    import { Router, Route, navigate } from "svelte-routing";
    import { user } from "../stores";

    import Home from "./routes/Home.svelte";

    export let path;
    export let component;
</script>

{#if $user}
    <Route {path} {component} />
{:else}
    <Router>
        <Route path="/" component={Home} />
    </Router>
{/if}
