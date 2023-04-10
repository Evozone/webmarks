<script>
    // Imports
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

    let contextName = "Untitled Context";

    // Helper function to get the document related to the context
    async function getDocument() {
        const docRef = doc(db, "contexts", `${id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            contextName = docSnap.data().name;
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
    getDocument();
</script>

<Navbar {contextName} />

<main class="min-h-screen p-10">
    <!-- Page title -->
    <h1 class="text-5xl font-bold text-center mb-20">{contextName}</h1>

    <!-- Webmarks -->
    <div
        class="border-dashed border-4 p-8 mx-auto grid grid-cols-3 gap-4 rounded-xl"
    >
        {#each Array(3).fill(1) as _, i}
            <WebMark />
        {/each}

        <!-- Create a WebMark Area -->
        <div
            class="w-full border-2 p-7 mx-auto flex flex-col items-center rounded-xl"
        >
            <!-- Bind input fields to values -->
            <input
                type="text"
                bind:value={createWebmarkTitle}
                class=" w-1/3 border-2 border-gray-300 p-2 rounded-lg outline-none"
                placeholder="Title"
            />
            <input
                type="text"
                bind:value={createWebmarkURL}
                class="w-1/3 border-2 border-gray-300 p-2 rounded-lg outline-none"
                placeholder="URL"
            />
            <textarea
                bind:value={createWebmarkNote}
                class="w-1/3 border-2 border-gray-300 p-2 rounded-lg outline-none"
                placeholder="Note"
            />
            <button
                on:click={createWebmark}
                class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Create
            </button>
        </div>
    </div>
</main>

<style>
    /* your styles go here */
</style>
