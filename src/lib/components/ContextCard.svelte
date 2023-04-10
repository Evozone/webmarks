<!-- The entire card is clickable with the link leading to the location path -->

<script>
    // Imports
    import { navigate } from "svelte-routing";

    // Exports
    export let location;
    export let name;

    // Javascript
    function gotoContext() {
        navigate(location);
    }
</script>

<div
    class="card bg-accent text-accent-content shadow-lg cursor-pointer"
    on:click={gotoContext}
    on:keypress={gotoContext}
>
    <div class="card-body">
        <h2 class="card-title">{name}</h2>
    </div>
</div>

<style>
</style>
