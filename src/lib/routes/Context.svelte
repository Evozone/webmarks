<script>
  import {
    doc,
    setDoc,
    getDoc,
    Timestamp,
    updateDoc,
    arrayUnion,
  } from "firebase/firestore";
  import { db } from "../../firebase";
  import ContextCard from "../components/ContextCard.svelte";
  import { loggedInUser } from "../../stores";

  export let location;
  export let id;
  async function getDocument() {
    const docRef = doc(db, "contexts", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function createWebmark() {
    const webmarkTitle = document.getElementById("webmark-title").value;
    const webmarkURL = document.getElementById("webmark-url").value;
    const webmarkNote = document.getElementById("webmark-note").value;
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

<div>
  <h1>Context {id}</h1>
  <p>Context content goes here</p>

  <div
    class="border-dashed border-4 p-8 mx-auto grid grid-cols-3 gap-4 rounded-xl"
  >
    {#each Array(3).fill(1) as _, i}
      <ContextCard location={`/context/${i + 1}`} />
    {/each}
    <div
      class="col-span-3 w-full border-dotted border-2 p-7 mx-auto flex flex-col items-center rounded-xl"
    >
      <input
        id="webmark-title"
        type="text"
        placeholder="Webmark Title"
        class="input input-bordered w-full max-w-xs"
      />

      <input
        id="webmark-url"
        type="text"
        placeholder="Paste the link here"
        class="input input-bordered w-full max-w-xs"
      />

      <input
        id="webmark-note"
        type="text"
        placeholder="Note"
        class="input input-bordered w-full max-w-xs"
      />
      <br />
      <button class="btn btn-primary ml-3" on:click={createWebmark}>
        Create
      </button>
    </div>
  </div>

  <!-- Go back to dashboard -->

  <a href="/dashboard">Go back to dashboard</a>
</div>

<style>
  /* your styles go here */
</style>
