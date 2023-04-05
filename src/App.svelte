<script>
  import { Router, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import ProtectedRoute from "./lib/ProtectedRoute.svelte";
  import jwt_decode from "jwt-decode";
  // Routes
  import Context from "./lib/routes/Context.svelte";
  import Dashboard from "./lib/routes/Dashboard.svelte";
  import Home from "./lib/routes/Home.svelte";

  import { loggedInUser } from "./stores";

  onMount(() => {
    // Check if user is logged in
    const token = window.localStorage.getItem("webmarksToken");
    loggedInUser.login(token);
  });
</script>

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
