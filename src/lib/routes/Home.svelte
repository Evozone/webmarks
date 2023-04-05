<script>
    // Imports
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { loggedInUser } from "../../stores";

    import GoogleLoginButton from "../components/GoogleLoginButton.svelte";

    // Exports
    export let location;

    // JavaScript
    let showLoading = true;

    onMount(() => {
        // If user is logged in, redirect to dashboard
        if ($loggedInUser !== null) {
            navigate("/dashboard");
        } else {
            showLoading = false;
        }
    });
</script>

<div class="container">
    <main>
        <div class="card">
            <h1>Welcome to WebMarks</h1>
            <p>
                This is a simple SvelteKit app that uses Firebase for
                authentication and database.
            </p>
            <!-- This button is important -->
            <GoogleLoginButton />
            <!-- This button is important -->
        </div>
    </main>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
