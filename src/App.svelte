<script>
    import { onMount } from "svelte";
    import { Router, Route, navigate } from "svelte-routing";
    import { auth } from "./firebase";
    import ProtectedRoute from "./lib/ProtectedRoute.svelte";

    // Routes
    import Context from "./lib/routes/Context.svelte";
    import Dashboard from "./lib/routes/Dashboard.svelte";
    import Home from "./lib/routes/Home.svelte";

    // Stores
    import { loggedInUser } from "./stores";

    let isAuthenticated = false;

    onMount(async () => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            loggedInUser.set(user);

            if (!user) {
                if (window.location.pathname !== "/") {
                    navigate("/");
                }
            } else {
                if (window.location.pathname === "/") {
                    navigate("/dashboard");
                } else {
                    // If the path is either /dashboard or /context/:id
                    if (
                        !window.location.pathname.match(
                            /\/dashboard|\/context\/\w+/
                        )
                    ) {
                        navigate("/dashboard");
                    }
                }
            }
        });

        await new Promise((resolve) => setTimeout(resolve, 500));

        isAuthenticated = $loggedInUser !== null;

        return unsubscribe;
    });
</script>

<Router>
    <Route path="/" component={Home} />
    {#if isAuthenticated}
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/context/:id" component={Context} />
    {/if}
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
