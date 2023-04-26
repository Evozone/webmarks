<script>
    // Imports
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import {
        doc,
        getDoc,
        Timestamp,
        updateDoc,
        arrayUnion,
    } from "firebase/firestore";
    import { db } from "../../firebase";

    // Stores
    import { loggedInUser, showLoading } from "../../stores";

    // Components
    import Navbar from "../components/util/Navbar.svelte";
    import WebMark from "../components/webmark/WebMark.svelte";
    import WebMarkForm from "../components/webmark/WebMarkForm.svelte";

    // Props
    export let location;
    export let id;

    // Javascript variables
    let contextName = "";
    let userWebmarks = [];
    let showAddWebmark = false;

    // Helper function to get the document related to the context
    async function getDocument() {
        $showLoading = true;
        const docRef = doc(db, "contexts", `${id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            contextName = docSnap.data().name;
            userWebmarks = docSnap.data().webmarks;
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        $showLoading = false;
    }

    onMount(() => {
        getDocument();
    });
</script>

<main class="pb-10">
    <!-- Navbar -->
    <Navbar />

    <!-- Page title -->
    <h1 class="text-7xl font-bold text-center my-20 text-accent hero-text">
        {contextName}
    </h1>

    <!-- Toggle Webmarkform -->
    <div class="flex px-8 justify-start">
        <button
            class="bg-accent text-accent-content font-bold py-2 px-4 rounded-full hover:bg-accent-focus"
            on:click={() => (showAddWebmark = !showAddWebmark)}
        >
            {#if showAddWebmark}
                Hide
            {:else}
                Add Webmark
            {/if}
        </button>
    </div>

    <div class="min-h-screen p-10 m-5 rounded-xl frost grid grid-cols-3 gap-4">
        <!-- Webmark form -->
        {#if showAddWebmark}
            <div transition:fly={{ x: -200, duration: 500 }} class="col-span-2">
                <WebMarkForm {id} {getDocument} />
            </div>
        {/if}
        {#each userWebmarks as webmark}
            <WebMark {...webmark} {webmark} contextId={id} {getDocument} />
        {/each}
    </div>
</main>

<style>
    .frost {
        background: rgba(59, 59, 59, 0.5);
    }

    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
        .frost {
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
        }
    }

    .hero-text {
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 1);
    }
</style>
