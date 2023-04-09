<script>
    // Imports
    import ContextCard from "../components/ContextCard.svelte";
    import Navbar from "../components/Navbar.svelte";

    export let location;
    export let id;
</script>

<!-- Navbar -->
<Navbar path="/dashboard" />

<main class="min-h-screen p-10">
    <!-- Page title -->
    <h1 class="text-5xl font-bold text-center mb-20">Dashboard</h1>

    <!-- Grid of contexts -->
    <div
        class="border-dashed border-4 p-8 mx-auto grid grid-cols-3 gap-4 rounded-xl"
    >
        <!-- Generate contexts with id from 1 to 9 -->
        {#each Array(9).fill(1) as _, i}
            <ContextCard location={`/context/${i + 1}`} />
        {/each}

        <!-- Create a context -->
        <div
            class="col-span-3 w-full border-dotted border-2 p-7 mx-auto flex flex-col items-center rounded-xl"
        >
            <h2 class="text-3xl font-bold text-center mb-3">
                Create a new context
            </h2>
            <!-- Round button with Plus -->
            <button
                class="rounded-full w-16 h-16 bg-blue-500 text-white text-3xl font-bold"
                on:click={() => {
                    location = "/context/:id";
                }}
            >
                +
            </button>
        </div>
        <!-- End:Create a context -->
    </div>
</main>

<style>
</style>
