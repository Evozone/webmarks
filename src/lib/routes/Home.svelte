<script>
    // Imports
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { collection, addDoc } from "firebase/firestore";
    import { auth, db } from "../../firebase";
    import { loggedInUser } from "../../stores";
    import Loading from "../components/Loading.svelte";

    // Exports
    export let location;

    // JavaScript
    const provider = new GoogleAuthProvider();
    let showLoading = true;

    // This function logs in the user using the Google authentication provider
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            console.log("User logged in with Google:", user);

            // Create user in database
            await createUser(user);

            // Set the user in the store
            loggedInUser.set(user);

            // Redirect to dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error("Error while logging in with Google:", error);
        }
    };

    // This function creates a new user in the database
    const createUser = async (user) => {
        try {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: new Date(),
            });
        } catch (error) {
            console.error("Error while creating user:", error);
        }
    };

    // This function is called when the component is mounted
    onMount(async () => {
        // Wait for 500ms
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Hide the loading screen
        showLoading = false;
    });
</script>

<div class="container">
    {#if showLoading}
        <Loading />
    {:else}
        <main>
            <div class="card">
                <h1>Welcome to WebMarks</h1>
                <p>
                    This is a simple SvelteKit app that uses Firebase for
                    authentication and database.
                </p>
                <button on:click={loginWithGoogle}>Login with Google</button>
            </div>
        </main>
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
