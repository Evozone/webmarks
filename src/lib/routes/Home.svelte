<script>
    // Imports
    import { onMount } from "svelte";
    import GoogleLoginButton from "../components/GoogleLoginButton.svelte";

    // Exports
    export let location;

    // JavaScript
    let showLoading = true;
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
