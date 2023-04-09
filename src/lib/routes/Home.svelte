<script>
    // Imports
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { loggedInUser } from "../../stores";

    // Components
    import GoogleLoginButton from "../components/GoogleLoginButton.svelte";
    import ThemeSwitcher from "../components/ThemeSwitcher.svelte";

    // Exports
    export let location;

    onMount(() => {
        // If user is logged in, redirect to dashboard
        if ($loggedInUser !== null) {
            navigate("/dashboard");
        }
    });
</script>

<main class="min-h-screen flex items-center justify-center">
    <div class="grid grid-cols-1 gap-4 p-4 max-w-2xl">
        <h1>Welcome to WebMarks</h1>
        <p>
            This is a simple SvelteKit app that uses Firebase for authentication
            and database.
        </p>
        <!-- This button is important -->
        <GoogleLoginButton />
        <!-- This button is important -->

        <ThemeSwitcher />
    </div>
</main>

<style>
</style>
