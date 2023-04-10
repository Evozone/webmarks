<script>
  // Imports
  import { doc, setDoc, Timestamp } from "firebase/firestore";

  import ContextCard from "../components/ContextCard.svelte";
  import Navbar from "../components/Navbar.svelte";
  import { navigate } from "svelte-routing";
  import { db } from "../../firebase";
  import { loggedInUser } from "../../stores";

  export let id;

  async function createContext() {
    const contextName = document.getElementById("context-name").value;
    const data = {
      name: contextName,
      ownerId: $loggedInUser.user_id,
      ownerName: $loggedInUser.name,
      ownerEmail: $loggedInUser.email,
      ownerPicture: $loggedInUser.picture,
      createdAt: Timestamp.now(),
    };
    const id = new Date().getTime();
    console.log(id, data);
    await setDoc(doc(db, "contexts", `${id}`), data);
    navigate(`/context/${id}`);
  }
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
      <input
        id="context-name"
        type="text"
        placeholder="Context name"
        class="input input-bordered w-full max-w-xs"
      />
      <br />
      <button class="btn btn-primary ml-3" on:click={createContext}>
        Create
      </button>
    </div>
    <!-- End:Create a context -->
  </div>
</main>

<style>
</style>
