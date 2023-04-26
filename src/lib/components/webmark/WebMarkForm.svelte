<script>
    // Import
    import { marked } from "marked";
    import {
        doc,
        getDoc,
        Timestamp,
        updateDoc,
        arrayUnion,
    } from "firebase/firestore";
    import { db } from "../../../firebase";

    // Stores
    import { showLoading, loggedInUser } from "../../../stores";

    // Props
    export let id;
    export let getDocument;

    // Javascript variables
    let createWebmarkTitle = "";
    let createWebmarkURL = "";
    let createWebmarkNote = "";

    // Functions
    async function createWebmark() {
        $showLoading = true;

        const webmarkTitle = createWebmarkTitle;
        const webmarkURL = createWebmarkURL;
        const webmarkNote = createWebmarkNote;
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

        await getDocument();

        // clear value of input fiels
        createWebmarkTitle = "";
        createWebmarkURL = "";
        createWebmarkNote = "";
        $showLoading = false;
    }

    // Function to toggle between note and preview
    let noteActive = true;
    const toggleNotePreview = () => {
        const note = document.querySelector(".note");
        const preview = document.querySelector(".preview");
        // If note is active, make preview active
        if (note.classList.contains("tab-active")) {
            note.classList.remove("tab-active");
            preview.classList.add("tab-active");
            noteActive = false;
        } else {
            // If preview is active, make note active
            preview.classList.remove("tab-active");
            note.classList.add("tab-active");
            noteActive = true;
        }
    };
</script>

<!-- Create a WebMark Area -->
<form
    on:submit|preventDefault={createWebmark}
    class="col-span-2 border-2 border-accent p-7 flex flex-col rounded-xl h-fit"
>
    <h2 class="text-2xl mb-4 text-accent">Add a new Webmark...</h2>
    <div class="w-full grid grid-cols-1 gap-4">
        <!-- Bind input fields to values -->
        <input
            type="text"
            bind:value={createWebmarkTitle}
            class="input input-bordered input-accent w-full"
            placeholder="Title"
            required
        />
        <input
            type="text"
            bind:value={createWebmarkURL}
            class="input input-bordered input-accent w-full"
            placeholder="URL"
            required
        />
        <div class="tabs">
            <button
                type="button"
                tabindex="0"
                on:click={toggleNotePreview}
                on:keydown={toggleNotePreview}
                class="tab tab-lifted tab-active note bg-neutraltext-neutral-content"
                >Note</button
            >
            <button
                type="button"
                tabindex="0"
                on:click={toggleNotePreview}
                on:keydown={toggleNotePreview}
                class="tab tab-lifted preview text-accent">Preview</button
            >
        </div>
        {#if noteActive}
            <textarea
                bind:value={createWebmarkNote}
                class="textarea textarea-accent w-full"
                placeholder="Note (optional, supports Markdown)"
                rows="4"
            />
        {:else}
            <div class="prose prose-sm bg-white p-3 rounded-xl shadow-lg">
                {#if createWebmarkNote}
                    {@html marked(createWebmarkNote)}
                {:else}
                    <p>
                        Start writing something in the note to see the output
                        here!
                    </p>
                {/if}
            </div>
        {/if}
    </div>
    <div class="flex justify-end gap-4">
        <button type="submit" class="btn btn-secondary mt-4"> Create </button>
        <button type="reset" class="btn btn-ghost mt-4"> Reset </button>
    </div>
</form>

<style>
</style>
