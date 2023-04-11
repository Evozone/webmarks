<script>
  // Imports
  import { onMount } from "svelte";
  import { marked } from "marked";
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

    getDocument();

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

<Navbar {contextName} />

<main class="min-h-screen p-10">
  <!-- Page title -->
  <h1 class="text-5xl font-bold text-center mb-20">{contextName}</h1>

  <!-- Webmarks -->
  <div
    class="border-dashed border-4 p-8 mx-auto grid grid-cols-3 gap-4 rounded-xl"
  >
    {#each userWebmarks as webmark}
      <WebMark {...webmark} {webmark} contextId={id} {getDocument} />
    {/each}

    <!-- Create a WebMark Area -->
    <div
      class="w-full col-span-3 border-2 border-accent p-7 mx-auto mt-3 flex flex-col rounded-xl"
    >
      <h2 class="text-2xl font-bold mb-4">Add a new Webmark...</h2>
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
          class="prose prose-sm prose-accent border-2 border-accent p-3 rounded-xl w-full"
        >
          {#if createWebmarkNote}
            {@html marked(createWebmarkNote)}
          {:else}
            <p>Preview</p>
          {/if}
        </div>
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
