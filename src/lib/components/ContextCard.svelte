<!-- The entire card is clickable with the link leading to the location path -->

<script>
    import { navigate } from "svelte-routing";

    export let location;

    function gotoContext() {
        navigate(location);
    }

    const name = `Context ${location.split("/")[2]}`;
</script>

<!-- <div class="card context-card" on:click={gotoContext} style="cursor: pointer;">
    Dummy name and link
    <h3>Context Name</h3>
</div> -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="card bg-accent text-accent-content shadow-lg cursor-pointer"
    on:click={gotoContext}
>
    <div class="card-body">
        <h2 class="card-title">{name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
            <!-- <button class="btn">Buy Now</button> -->
        </div>
    </div>
</div>

<style>
</style>
