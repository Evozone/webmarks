<script>
    // Imports
    import { navigate } from 'svelte-routing';
    import { auth } from '../../../firebase';

    // Stores
    import { loggedInUser, showLoading } from '../../../stores';

    // Icons
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FiLogOut from 'svelte-icons-pack/fi/FiLogOut';

    // This function logs out the user
    const logout = async () => {
        $showLoading = true;
        try {
            await auth.signOut();
            await localStorage.removeItem('webmarksToken');
            loggedInUser.set(null);
            navigate('/');
            $showLoading = false;
        } catch (error) {
            console.error('Error while logging out:', error);
        }
    };
</script>

<button on:click={logout} class="btn btn-primary btn-sm flex items-center justify-between">
    <span>Logout</span>
    <Icon src={FiLogOut} />
</button>

<style>
    .logout-button:hover {
        background-color: #fa695f;
    }
</style>
