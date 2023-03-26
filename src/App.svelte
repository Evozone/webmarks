<script>
    import { onMount } from "svelte";
    import { Router, Route, navigate } from "svelte-routing";
    import { auth } from "./firebase";
    import ProtectedRoute from "./lib/ProtectedRoute.svelte";

    // Routes
    import Context from "./lib/routes/Context.svelte";
    import Dashboard from "./lib/routes/Dashboard.svelte";
    import Home from "./lib/routes/Home.svelte";

    // JavaScript
    const routes = ["/", "/dashboard", "/context"];

    // Handle wildcard routes
    onMount(() => {
        const path = window.location.pathname;

        if (!routes.includes(path)) {
            // If user is logged in, redirect to dashboard
            console.log(auth.currentUser);
            if (auth.currentUser) {
                navigate("/dashboard");
            } else {
                navigate("/");
            }
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
