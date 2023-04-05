<script>
    import { Router, Route } from "svelte-routing";
    import ProtectedRoute from "./lib/ProtectedRoute.svelte";
    import "../app.css";
    // Routes
    import Context from "./lib/routes/Context.svelte";
    import Dashboard from "./lib/routes/Dashboard.svelte";
    import Home from "./lib/routes/Home.svelte";
</script>

<Router>
    <Route path="/">
        <Home location="/" />
    </Route>
    <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
    </Route>
    <Route path="/context/:id">
        <ProtectedRoute component={Context} />
    </Route>
</Router>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    :global(code) {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
    }
</style>
