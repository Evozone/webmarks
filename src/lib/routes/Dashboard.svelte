<script>
  // Imports
  import { onMount } from "svelte";
  import {
    doc,
    setDoc,
    Timestamp,
    collection,
    query,
    where,
    getDocs,
  } from "firebase/firestore";
  import { navigate } from "svelte-routing";
  import { db } from "../../firebase";

  // Icons
  import Icon from "svelte-icons-pack";
  import BsFolderPlus from "svelte-icons-pack/bs/BsFolderPlus";

  // Stores
  import { loggedInUser, showLoading } from "../../stores";

  // Components
  import ContextCard from "../components/ContextCard.svelte";
  import Navbar from "../components/Navbar.svelte";

  export let id;

  // Javascript
  let contextName = "";
  let userContexts = [];

  async function createContext() {
    const id = new Date().getTime();

    const data = {
      name: contextName,
      ownerId: $loggedInUser.user_id,
      ownerName: $loggedInUser.name,
      ownerEmail: $loggedInUser.email,
      ownerPicture: $loggedInUser.picture,
      createdAt: Timestamp.now(),
      webmarks: [],
      id: id,
    };
    await setDoc(doc(db, "contexts", `${id}`), data);
    navigate(`/context/${id}`);
  }

  async function getUserContexts() {
    $showLoading = true;
    const userContextsRef = await getDocs(
      query(
        collection(db, "contexts"),
        where("ownerId", "==", $loggedInUser.user_id)
      )
    );
    const data = userContextsRef.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    userContexts = data;
    $showLoading = false;
  }
  onMount(async () => {
    await getUserContexts();
  });
</script>

<!-- Navbar -->
<Navbar />

<main class="min-h-screen p-10">
  <!-- Page title -->
  <h1 class="text-5xl font-bold text-center mb-20">Dashboard</h1>

  <!-- Grid of contexts -->
  <div
    class="border-dashed border-4 p-8 mx-auto grid grid-cols-3 gap-4 rounded-xl"
  >
    <!-- Create a context -->
    <div class="w-full border-2 p-5 mx-auto flex items-center rounded-xl">
      <!-- Bind input fields to values -->
      <input
        type="text"
        class="input input-primary w-full max-w-xs"
        placeholder="Add a new Context"
        bind:value={contextName}
      />
      <button class="btn btn-primary ml-3" on:click={createContext}>
        <Icon src={BsFolderPlus} size="24" />
      </button>
    </div>
    <!-- End:Create a context -->
    <!-- User contexts -->
    {#each userContexts as context}
      <ContextCard
        location={`/context/${context.id}`}
        name={context.name}
        id={context.id}
        {getUserContexts}
      />
    {/each}
  </div>
</main>

<style>
</style>
