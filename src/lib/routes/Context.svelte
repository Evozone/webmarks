<script>
    // Imports
    import { onMount } from "svelte";
    import {
        doc,
        setDoc,
        getDoc,
        Timestamp,
        updateDoc,
        arrayUnion,
    } from "firebase/firestore";
    import { db } from "../../firebase";

    // Stores
    import { loggedInUser, showLoading } from "../../stores";

    // Components
    import Navbar from "../components/Navbar.svelte";
    import WebMark from "../components/WebMark.svelte";

    // Exported variables
    export let location;
    export let id;

    // Javascript variables
    let createWebmarkTitle = "";
    let createWebmarkURL = "";
    let createWebmarkNote = "";

    let contextName = "";
    let userWebmarks = [];

    // Helper function to get the document related to the context
    async function getDocument() {
        const docRef = doc(db, "contexts", `${id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            contextName = docSnap.data().name;
            userWebmarks = docSnap.data().webmarks;
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    async function createWebmark() {
        const webmarkTitle = createWebmarkTitle;
        const webmarkURL = createWebmarkURL;
        const webmarkNote = createWebmarkNote;
        const data = {
            name: webmarkTitle,
            link: webmarkURL,
            note: webmarkNote,
            ownerId: $loggedInUser.user_id,
            ownerName: $loggedInUser.name,
            ownerEmail: $loggedInUser.email,
            ownerPicture: $loggedInUser.picture,
            createdAt: Timestamp.now(),
        };

        const dbRef = doc(db, "contexts", `${id}`);

        await updateDoc(dbRef, {
            webmarks: arrayUnion(data),
        });

        getDocument();
    }

    onMount(async () => {
        $showLoading = true;
        await getDocument();
        $showLoading = false;
    });
</script>

<Navbar {contextName} />

<main class="min-h-screen p-10">
    <!-- Page title -->
    <h1 class="text-5xl font-bold text-center mb-20">{contextName}</h1>

    <!-- Webmarks -->
    <div
        class="border-dashed border-4 p-8 mx-auto grid grid-cols-3 gap-4 rounded-xl"
    >
        {#each userWebmarks as webmark}
            <WebMark {...webmark} />
        {/each}

        <!-- Create a WebMark Area -->
        <div
            class="col-span-3 border-2 border-accent p-7 mx-auto mt-3 flex flex-col items-center rounded-xl"
        >
            <h2 class="text-2xl font-bold mb-4">Create a WebMark</h2>
            <div class="grid grid-cols-2 gap-4">
                <!-- Bind input fields to values -->
                <input
                    type="text"
                    bind:value={createWebmarkTitle}
                    class="input input-bordered input-accent w-full max-w-xs"
                    placeholder="Title"
                />
                <textarea
                    bind:value={createWebmarkNote}
                    class="textarea textarea-accent row-span-2 w-full max-w-xs"
                    placeholder="Note"
                />
                <input
                    type="text"
                    bind:value={createWebmarkURL}
                    class="input input-bordered input-accent w-full max-w-xs"
                    placeholder="URL"
                />
            </div>

            <button on:click={createWebmark} class="btn btn-secondary mt-4">
                Create
            </button>
        </div>
    </div>
</main>

<style>
    /* your styles go here */
</style>
