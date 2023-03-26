<script>
    import { Router, Route } from "svelte-routing";
    import Context from "./lib/routes/Context.svelte";
    import Dashboard from "./lib/routes/Dashboard.svelte";
    import Home from "./lib/routes/Home.svelte";
</script>

<Router>
    <Route path="/">
        <Home />
    </Route>
    <Route path="/dashboard">
        <Dashboard />
    </Route>
    <Route path="/context/:id">
        <Context />
    </Route>
</Router>

<style>
    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.svelte:hover {
        filter: drop-shadow(0 0 2em #ff3e00aa);
    }
    .read-the-docs {
        color: #888;
    }
</style>
