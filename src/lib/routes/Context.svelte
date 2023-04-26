<script>
    // Imports
    import { onMount } from "svelte";
    import { marked } from "marked";
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

    async function createWebmark() {
        if (createWebmarkTitle === "" || createWebmarkURL === "") {
            alert("Please enter a title and URL for the webmark");
            return;
        }
        $showLoading = true;

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

        await getDocument();

        // clear value of input fiels
        createWebmarkTitle = "";
        createWebmarkURL = "";
        createWebmarkNote = "";
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

    <div class="min-h-screen p-10 m-5 rounded-xl frost grid grid-cols-3 gap-4">
        {#each userWebmarks as webmark}
            <WebMark {...webmark} {webmark} contextId={id} {getDocument} />
        {/each}

        <!-- Create a WebMark Area -->
        <div
            class="w-full col-span-3 border-2 border-accent p-7 mx-auto mt-3 flex flex-col rounded-xl"
        >
            <h2 class="text-2xl mb-4 text-secondary">Add a new Webmark...</h2>
            <div class="w-full grid grid-cols-2 gap-4">
                <!-- Bind input fields to values -->
                <input
                    type="text"
                    bind:value={createWebmarkTitle}
                    class="input input-bordered input-accent w-full"
                    placeholder="Title"
                />
                <input
                    type="text"
                    bind:value={createWebmarkURL}
                    class="input input-bordered input-accent w-full"
                    placeholder="URL"
                />
                <textarea
                    bind:value={createWebmarkNote}
                    class="textarea textarea-accent w-full"
                    placeholder="Note"
                />
                <div
                    class="prose prose-sm bg-white border-primary p-3 rounded-xl w-full shadow-lg"
                >
                    {#if createWebmarkNote}
                        {@html marked(createWebmarkNote)}
                    {:else}
                        <p>Note Preview</p>
                    {/if}
                </div>
            </div>
            <div>
                <button on:click={createWebmark} class="btn btn-secondary mt-4">
                    Create
                </button>
            </div>
        </div>
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
