<!-- The entire card is clickable with the link leading to the location path -->

<script>
    // Imports
    import { navigate } from 'svelte-routing';
    import { doc, deleteDoc } from 'firebase/firestore';

    // Icons
    import Icon from 'svelte-icons-pack';
    import BsFolder from 'svelte-icons-pack/bs/BsFolder';

    import AiFillDelete from 'svelte-icons-pack/ai/AiFillDelete';

    import { db } from '../../firebase';
    import { showLoading } from '../../stores';

    // Exports
    export let location;
    export let name;
    export let id;
    export let getUserContexts;
    // Javascript
    function gotoContext() {
        navigate(location);
    }

    async function deleteContext() {
        const choice = confirm('Are you sure you want to delete this context?');
        if (!choice) return;
        $showLoading = true;
        await deleteDoc(doc(db, 'contexts', `${id}`));
        $showLoading = false;
        await getUserContexts();
    }
</script>

<div
    class="card bg-secondary hover:bg-accent text-secondary-content cursor-pointer rounded-md h-20"
    on:click={gotoContext}
    on:keypress={gotoContext}
>
    <div class="card-body p-4 flex flex-col justify-center">
        <h2 class="card-title">
            <Icon src={BsFolder} size="24" />
            {name}
        </h2>
    </div>
    <button
        class="btn btn-square btn-ghost absolute top-1 right-1 btn-xs hover:scale-110"
        on:click|stopPropagation={deleteContext}
    >
        <Icon src={AiFillDelete} size="18" color="black" />
    </button>
</div>

<style>
</style>
