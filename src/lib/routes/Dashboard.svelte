<script>
    // Imports
    import { onMount } from 'svelte';
    import { doc, setDoc, Timestamp, collection, query, where, getDocs } from 'firebase/firestore';
    import { navigate } from 'svelte-routing';
    import { db } from '../../firebase';

    // Icons
    import Icon from 'svelte-icons-pack';
    import BsFolderPlus from 'svelte-icons-pack/bs/BsFolderPlus';

    // Stores
    import { loggedInUser, showLoading } from '../../stores';

    // Components
    import ContextCard from '../components/ContextCard.svelte';
    import Navbar from '../components/util/Navbar.svelte';

    export let id;
    export let location;

    // Javascript
    let contextName = '';
    let contextNameTooLong = false;
    let userContexts = [];

    async function createContext() {
        if (contextName === '') {
            alert('Please enter a name for the context');
            return;
        }
        const id = new Date().getTime();
        const data = {
            name: contextName,
            ownerId: $loggedInUser.user_id,
            ownerName: $loggedInUser.name,
            ownerEmail: $loggedInUser.email,
            ownerPicture: $loggedInUser.picture,
            createdAt: Timestamp.now(),
            webmarks: [],
            id: id
        };
        await setDoc(doc(db, 'contexts', `${id}`), data);
        navigate(`/context/${id}`);
    }

    async function getUserContexts() {
        $showLoading = true;
        const userContextsRef = await getDocs(
            query(collection(db, 'contexts'), where('ownerId', '==', $loggedInUser.user_id))
        );
        const data = userContextsRef.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
        userContexts = data;
        $showLoading = false;
    }
    onMount(async () => {
        await getUserContexts();

        // Context name cannot be over 25 characters
        const input = document.querySelector('.input');
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 25) {
                e.target.value = e.target.value.slice(0, 25);
                // Quickly switch the class to trigger the animation
                contextNameTooLong = true;
                setTimeout(() => {
                    contextNameTooLong = false;
                }, 300);
            }
        });
    });
</script>

<main class="pb-10">
    <!-- Navbar -->
    <Navbar />

    <!-- Page title -->
    <h1 class="text-7xl font-bold text-center my-16 text-secondary hero-text">Dashboard</h1>

    <div class="min-h-screen p-10 m-5 rounded-xl frost">
        <div class="grid grid-cols-3 gap-4">
            <!-- Create a context -->
            <div class="w-full h-20 border-2 p-3 mx-auto flex items-center rounded-xl">
                <!-- Bind input fields to values -->
                <input
                    type="text"
                    class="input input-primary w-full max-w-xs"
                    placeholder="Add a new Context"
                    bind:value={contextName}
                    class:input-error={contextNameTooLong}
                    on:keydown={(e) => {
                        if (e.key === 'Enter') {
                            createContext();
                        }
                    }}
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
    </div>
</main>

<style>
</style>
