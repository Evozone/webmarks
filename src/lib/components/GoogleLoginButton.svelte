<script>
    // Imports
    import { navigate } from "svelte-routing";
    import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { collection, addDoc } from "firebase/firestore";
    import { auth, db } from "../../firebase";
    import { loggedInUser } from "../../stores";

    // JavaScript
    const provider = new GoogleAuthProvider();

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
</script>

<button on:click={loginWithGoogle} class="google-button"
    >Login with Google</button
>

<style>
    .google-button {
        background-color: #4285f4;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
    }
</style>
