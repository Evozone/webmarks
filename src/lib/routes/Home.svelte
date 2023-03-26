<script>
    // Imports
    import { navigate } from "svelte-routing";
    import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { auth, db } from "../../firebase";

    export let location;

    const provider = new GoogleAuthProvider();

    // This function logs in the user using the Google authentication provider
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            console.log("User logged in with Google:", user);

            // Redirect to dashboard
            navigate("/dashboard");
            localStorage.setItem("webmarks-last-route", "/dashboard");
        } catch (error) {
            console.error("Error while logging in with Google:", error);
        }
    };
</script>

<div class="container">
    {#if !auth.currentUser}
        <p>Welcome to the Webmarks app! Please log in to continue.</p>
        <button on:click={loginWithGoogle}>Log in with Google</button>
    {:else}
        <p>Welcome back, {auth.currentUser.displayName}!</p>
        <button on:click={() => navigate("/dashboard")}>Go to dashboard</button>
    {/if}
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
