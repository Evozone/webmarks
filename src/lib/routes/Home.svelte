<script>
    import { onMount } from "svelte";
    import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { auth } from "../../firebase";
    import { user } from "../../stores";
    import { from } from "rxjs";
    import { switchMap } from "rxjs/operators";
    import { collectionData } from "rxfire/firestore";
    import { db } from "../../firebase";

    const provider = new GoogleAuthProvider();

    // This function logs in the user using the Google authentication provider
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("User logged in:", user);
        } catch (error) {
            console.error("Error while logging in with Google:", error);
        }
    };

    // This function logs out the user
    const logout = async () => {
        try {
            await auth.signOut();
            console.log("User logged out");
        } catch (error) {
            console.error("Error while logging out:", error);
        }
    };
</script>

<div class="container">
    {#if $user}
        <p>Hello, {$user.displayName}! You are logged in.</p>
        <button on:click={logout}>Logout</button>
    {:else}
        <p>Welcome to the Webmarks app! Please log in to continue.</p>
        <button on:click={loginWithGoogle}>Log in with Google</button>
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
