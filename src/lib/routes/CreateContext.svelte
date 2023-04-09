<script>
    // Imports
    import ContextCard from "../components/ContextCard.svelte";
    import Navbar from "../components/Navbar.svelte";

    export let location;
    export let id;
</script>

<!-- Navbar -->
<Navbar path="/create" />

<main class="min-h-screen p-10">
    <!-- Page title -->
    <h1 class="text-5xl font-bold text-center p-8">Dashboard</h1>
    <!-- Go to contexts -->
    <div
        class="border-dashed border-4 p-8 mx-auto grid grid-cols-3 gap-4 rounded-xl"
    >
        <!-- Generate contexts with id from 1 to 9 -->
        {#each Array(9).fill(1) as _, i}
            <ContextCard location={`/context/${i + 1}`} />
        {/each}

        <!-- Create a context -->
        <div
            class="border-dashed border-4 p-8 mx-auto grid grid-cols-3 gap-4 rounded-xl"
        >
            <div class="col-span-3">
                <h2 class="text-3xl font-bold text-center">Create a context</h2>
            </div>
            <div class="col-span-3">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    +
                </button>
            </div>
        </div>
    </div>
</main>

<style>
</style>
