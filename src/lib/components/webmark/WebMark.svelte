<script>
    import { marked } from "marked";
    import { onMount } from "svelte";
    import Icon from "svelte-icons-pack";
    import AiOutlineDelete from "svelte-icons-pack/ai/AiOutlineDelete";

    import { doc, updateDoc, arrayRemove } from "firebase/firestore";
    import { db } from "../../../firebase";
    import { showLoading } from "../../../stores";

    export let webmark;
    export let createdAt;
    export let link;
    export let name;
    export let note;
    export let ownerEmail;
    export let ownerId;
    export let ownerName;
    export let ownerPicture;
    export let contextId;
    export let getDocument;
    // Javascript variables
    let isYoutubeVideo = false;
    let isTwitterPost = false;

    let youtubeVideoTitle = "";
    let twitterPostTitle = "";

    onMount(() => {
        // Test if the link is a valid URL
        const url = new URL(link);

        // If the link is a valid URL, then show the content
        if (url) {
            // Check regex for the link
            // If the link is a youtube video, then show the youtube video
            // If the link is a twitter post, then show the twitter post

            // If the link is a normal link, then show the link

            const youtubeRegex =
                /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
            const twitterRegex =
                /(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/;

            if (youtubeRegex.test(link)) {
                isYoutubeVideo = true;
            } else if (twitterRegex.test(link)) {
                isTwitterPost = true;
            } else {
                isYoutubeVideo = false;
                isTwitterPost = false;
            }
        }
    });

    const openLink = () => {
        window.open(link, "_blank");
    };

    const colorRandomizer = () => {
        const colors = [
            "bg-accent",
            "bg-primary",
            "bg-secondary",
            "bg-tertiary",
            "bg-success",
            "bg-warning",
            "bg-error",
            "bg-info",
        ];

        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        return randomColor;
    };

    async function deleteWebmark() {
        const response = confirm(
            "Are you sure you want to delete this webmark?"
        );
        if (response) {
            // Delete the webmark
            $showLoading = true;
            const dbRef = doc(db, "contexts", `${contextId}`);
            await updateDoc(dbRef, {
                webmarks: arrayRemove(webmark),
            });
            $showLoading = false;
            await getDocument();
        }
    }
</script>

<div class="tooltip h-fit" data-tip="Open in a new Tab">
    <div
        class="card bg-accent text-accent-content shadow-lg cursor-pointer rounded-md hover:scale-105 transition-all duration-300 ease-in-out"
        on:click={openLink}
        on:keydown={openLink}
    >
        <div class="card-body">
            <!-- Title -->
            <h2 class="card-title text-2xl font-bold mb-3">{name}</h2>
            <!-- Optional Note -->
            {#if note}
                <div
                    class="prose prose-sm bg-white p-3 rounded-xl w-full shadow-lg text-left"
                >
                    {@html marked(note)}
                </div>
            {/if}
            <!-- Link -->
            {#if isYoutubeVideo}
                <iframe
                    title="Youtube Video"
                    src={"https://www.youtube.com/embed/" +
                        link.split("v=")[1].split("&")[0]}
                    class="w-full rounded-md"
                    allowfullscreen
                />
            {:else if isTwitterPost}
                <iframe
                    title="Twitter Post"
                    src={"https://twitframe.com/show?url=" + link}
                    class="w-full rounded-md"
                    allowfullscreen
                />
            {/if}
            <!-- Delete -->
            <button
                class="btn btn-square btn-ghost absolute top-1 right-1 btn-xs hover:scale-110"
                on:click|stopPropagation={deleteWebmark}
            >
                <Icon src={AiOutlineDelete} size="24" color="red" />
            </button>
        </div>
    </div>
</div>

<style>
    .btn-ghost:hover {
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
