<script>
    // Imports
    import { navigate } from "svelte-routing";
    import { auth } from "../../firebase";
    import { loggedInUser } from "../../stores";

    // This function logs out the user
    const logout = async () => {
        try {
            await auth.signOut();
            await localStorage.removeItem("webmarksToken");
            loggedInUser.set(null);
            navigate("/");
        } catch (error) {
            console.error("Error while logging out:", error);
        }
    };
</script>

<button on:click={logout} class="logout-button"> Logout </button>

<style>
    .logout-button {
        background-color: #f44336;
        border: none;
        color: white;
        padding: 15px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    }
</style>
