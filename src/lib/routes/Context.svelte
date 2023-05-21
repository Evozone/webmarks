<script>
    // Imports
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { fly } from 'svelte/transition';
    import { doc, getDoc, Timestamp, updateDoc, arrayUnion } from 'firebase/firestore';
    import { db } from '../../firebase';

    // Stores
    import { loggedInUser, showLoading } from '../../stores';

    // Components
    import Navbar from '../components/util/Navbar.svelte';
    import WebMark from '../components/webmark/WebMark.svelte';
    import WebMarkForm from '../components/webmark/WebMarkForm.svelte';

    // Props
    export let location;
    export let id;

    // Javascript variables
    let contextName = '';
    let userWebmarks = [];
    let showAddWebmark = false;

    // Helper function to get the document related to the context
    async function getDocument() {
        $showLoading = true;
        const docRef = doc(db, 'contexts', `${id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            contextName = docSnap.data().name;
            userWebmarks = docSnap.data().webmarks;
        } else {
            // docSnap.data() will be undefined in this case
            console.log('No such document!');
        }
        $showLoading = false;
    }

    onMount(() => {
        getDocument();
    });
</script>

<main class="pb-10">
    <!-- Navbar -->
    <Navbar {contextName} />

    <!-- Page title -->
    <h1 class="text-5xl font-bold text-center my-12 text-secondary hero-text">
        &lcub; {contextName} &rcub;
    </h1>

    <!-- Buttons -->
    <div class="flex px-8 justify-start">
        <button
            class="bg-secondary text-secondary-content font-bold py-2 px-4 rounded-full hover:bg-secondary-focus mr-2"
            on:click={() => navigate('/dashboard')}
        >
            ← Dashboard
        </button>
        <button
            class="bg-primary text-primary-content font-bold py-2 px-4 rounded-full hover:bg-primary-focus"
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
            <div transition:fly={{ x: -200, duration: 500 }} class="col-span-3">
                <WebMarkForm {id} {getDocument} />
            </div>
        {/if}
        {#each userWebmarks as webmark}
            <WebMark {...webmark} {webmark} contextId={id} {getDocument} />
        {/each}
    </div>
</main>

<style>
</style>
