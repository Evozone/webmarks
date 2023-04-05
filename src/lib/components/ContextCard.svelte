<!-- The entire card is clickable with the link leading to the location path -->

<script>
    import { navigate } from "svelte-routing";

    export let location;

    function gotoContext() {
        navigate(location);
    }
</script>

<div class="card context-card" on:click={gotoContext} style="cursor: pointer;">
    <!-- Dummy name and link -->
    <h3>Context Name</h3>
</div>

<style>
    .context-card {
        border: 1px solid #ccc;
        height: 10rem;
        border-radius: 5px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: background-color 0.2s ease-in-out;
    }

    .context-card:hover {
        background-color: #f5f5f5;
        color: #000;
    }
</style>
