<script>
    // Imports
    import { navigate } from "svelte-routing";
    import { auth } from "../../firebase";

    export let location;

    // This function logs out the user
    const logout = async () => {
        try {
            await auth.signOut();
            navigate("/");
            console.log("User logged out");
        } catch (error) {
            console.error("Error while logging out:", error);
        }
    };
</script>

<div>
    <h1>Dashboard</h1>
    <p>Dashboard content goes here</p>

    <button on:click={logout}>Log out</button>

    <!-- Go to contexts -->
    <a href="/context/123">Go to contexts</a>
</div>

<style>
    /* your styles go here */
</style>
