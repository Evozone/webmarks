<script>
    import { onMount } from "svelte";
    import { Router, Route, navigate } from "svelte-routing";
    import ProtectedRoute from "./lib/ProtectedRoute.svelte";

    // Firebase
    import { auth } from "./firebase.js";

    // Routes
    import Context from "./lib/routes/Context.svelte";
    import Dashboard from "./lib/routes/Dashboard.svelte";
    import Home from "./lib/routes/Home.svelte";

    // Store
    import { user } from "./stores";

    // Handle wildcard routes
    onMount(() => {
        const path = window.location.pathname;
        if (path !== "/" && path !== "/dashboard" && path !== "/context") {
            navigate("/", { replace: true });
        }
    });
</script>

<Router>
    <Route path="/" component={Home} />
    <ProtectedRoute path="/dashboard" component={Dashboard} />
    <ProtectedRoute path="/context" component={Context} />
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
