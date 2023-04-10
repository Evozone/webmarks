<!-- The entire card is clickable with the link leading to the location path -->

<script>
    // Imports
    import { navigate } from "svelte-routing";

    // Icons
    import Icon from "svelte-icons-pack";
    import BsFolder from "svelte-icons-pack/bs/BsFolder";

    // Exports
    export let location;
    export let name;

    // Javascript
    function gotoContext() {
        navigate(location);
    }
</script>

<div
    class="card bg-base-200 border-primary border-2 hover:bg-base-300 cursor-pointer"
    on:click={gotoContext}
    on:keypress={gotoContext}
>
    <div class="card-body">
        <h2 class="card-title">
            <Icon src={BsFolder} size="24" />
            {name}
        </h2>
    </div>
</div>

<style>
</style>
