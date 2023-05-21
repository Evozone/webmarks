<script>
    import { Router, Route } from 'svelte-routing';
    import { onMount } from 'svelte';
    import ProtectedRoute from './lib/ProtectedRoute.svelte';
    // Routes
    import Context from './lib/routes/Context.svelte';
    import Dashboard from './lib/routes/Dashboard.svelte';
    import Home from './lib/routes/Home.svelte';

    // Stores
    import { loggedInUser, showLoading } from './stores';

    // Components
    import Loading from './lib/components/util/Loading.svelte';

    onMount(() => {
        // If theme not present in local storage, set it to default
        const theme = window.localStorage.getItem('theme') || null;
        if (!theme) {
            window.localStorage.setItem('theme', 'default');
        }
        // Check if user is logged in
        // Check if tokenis present in local storage
        const token = window.localStorage.getItem('webmarksToken') || null;
        if (token) {
            loggedInUser.login(token);
        }

        // Don't redirect to any page outside of /, /dashboard, /context/:id
        const path = window.location.pathname;
        if (path !== '/' && path !== '/dashboard' && path.split('/')[1] !== 'context') {
            window.location.pathname = '/';
        }
    });
</script>

{#if $showLoading}
    <Loading />
{/if}

<Router>
    <Route path="/">
        <Home location="/" />
    </Route>
    <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} id={null} />
    </Route>
    <Route path="/context/:id" let:params>
        <ProtectedRoute component={Context} id={params.id} />
    </Route>
</Router>

<style>
</style>
