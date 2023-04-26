<!-- The entire card is clickable with the link leading to the location path -->

<script>
    // Imports
    import { navigate } from "svelte-routing";
    import { doc, deleteDoc } from "firebase/firestore";

    // Icons
    import Icon from "svelte-icons-pack";
    import BsFolder from "svelte-icons-pack/bs/BsFolder";

    import AiOutlineDelete from "svelte-icons-pack/ai/AiOutlineDelete";

    import { db } from "../../firebase";
    import { showLoading } from "../../stores";

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
        const choice = confirm("Are you sure you want to delete this context?");
        if (!choice) return;
        $showLoading = true;
        await deleteDoc(doc(db, "contexts", `${id}`));
        $showLoading = false;
        await getUserContexts();
    }
</script>

<div
    class="card bg-base-200 hover:bg-base-300 cursor-pointer rounded-md"
    on:click={gotoContext}
    on:keypress={gotoContext}
>
    <div class="card-body">
        <h2 class="card-title">
            <Icon src={BsFolder} size="24" />
            {name}
        </h2>
    </div>
    <button
        class="btn btn-square btn-ghost absolute top-1 right-1 btn-xs hover:scale-110"
        on:click|stopPropagation={deleteContext}
    >
        <Icon src={AiOutlineDelete} size="18" color="red" />
    </button>
</div>

<style>
    .btn-xs {
        animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }

    @keyframes shake {
        10%,
        90% {
            transform: translate3d(-1px, 0, 0);
        }

        20%,
        80% {
            transform: translate3d(2px, 0, 0);
        }

        30%,
        50%,
        70% {
            transform: translate3d(-4px, 0, 0);
        }

        40%,
        60% {
            transform: translate3d(4px, 0, 0);
        }
    }
</style>
