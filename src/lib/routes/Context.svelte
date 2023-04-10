<script>
    import { doc, getDoc } from "firebase/firestore";
    import { db } from "../../firebase";
    import ContextCard from "../components/ContextCard.svelte";

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
                id="context-name"
                type="text"
                placeholder="Context name"
                class="input input-bordered w-full max-w-xs"
            />

            <input
                id="context-name"
                type="text"
                placeholder="Paste the link here"
                class="input input-bordered w-full max-w-xs"
            />

            <input
                type="text"
                placeholder="Note"
                class="input input-bordered w-full max-w-xs"
            />
            <br />
            <button class="btn btn-primary ml-3" on:click={createContext}>
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
