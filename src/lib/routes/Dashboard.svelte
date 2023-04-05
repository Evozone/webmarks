<script>
    // Imports
    import ContextCard from "../components/ContextCard.svelte";
    import Navbar from "../components/Navbar.svelte";

    export let location;
</script>

<!-- Navbar -->
<Navbar path="/dashboard" />
<main>
    <!-- Page title -->
    <h1>Dashboard</h1>

    <!-- Go to contexts -->
    <div class="dashed-border-container grid-3">
        <!-- Generate contexts with id from 1 to 9 -->
        {#each Array(9).fill(1) as _, i}
            <ContextCard location={`/context/${i + 1}`} />
        {/each}
    </div>
</main>

<style>
    .dashed-border-container {
        min-height: 100vh;
        border: 4px dashed #ccc;
        border-radius: 1rem;
        padding: 2rem;
        margin: 7rem 0;
    }

    .grid-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2rem;
    }
</style>
