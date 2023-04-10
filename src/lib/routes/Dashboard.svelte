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
    import FiPlusCircle from "svelte-icons-pack/fi/FiPlusCircle";

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
        const data = {
            name: contextName,
            ownerId: $loggedInUser.user_id,
            ownerName: $loggedInUser.name,
            ownerEmail: $loggedInUser.email,
            ownerPicture: $loggedInUser.picture,
            createdAt: Timestamp.now(),
            webmarks: [],
        };
        const id = new Date().getTime();
        await setDoc(doc(db, "contexts", `${id}`), data);
        navigate(`/context/${id}`);
    }

    onMount(async () => {
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
        <div
            class="w-full border-2 p-7 mx-auto flex flex-row items-center rounded-xl"
        >
            <!-- Bind input fields to values -->
            <input
                type="text"
                class="input input-bordered w-full max-w-xs mb-6 p-2"
                placeholder="Create a new Context"
                bind:value={contextName}
            />
            <button class="btn btn-primary ml-3" on:click={createContext}>
                <Icon src={FiPlusCircle} />
            </button>
        </div>
        <!-- End:Create a context -->
        <!-- User contexts -->
        {#each userContexts as context}
            <ContextCard
                location={`/context/${context.id}`}
                name={context.name}
            />
        {/each}
    </div>
</main>

<style>
</style>
