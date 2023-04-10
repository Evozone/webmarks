<script>
    import { marked } from "marked";
    import { onMount } from "svelte";

    export let createdAt;
    export let link;
    export let name;
    export let note;
    export let ownerEmail;
    export let ownerId;
    export let ownerName;
    export let ownerPicture;

    // Javascript variables
    let isYoutubeVideo = false;
    let isTwitterPost = false;

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
                // Show the youtube video
            } else if (twitterRegex.test(link)) {
                // Show the twitter post
            } else {
                // Show the link
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
</script>

<div
    class="card bg-accent text-secondary-content shadow-lg cursor-pointer hover:shadow-2xl"
    on:click={openLink}
    on:keydown={openLink}
>
    <div class="card-body">
        <h2 class="card-title text-2xl font-bold">{name}</h2>
        <div class="justify-end" />
        {@html marked(note)}
    </div>
</div>

<style>
</style>
