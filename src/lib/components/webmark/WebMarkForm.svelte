<script>
    // Import
    import { marked } from 'marked';
    import { fly } from 'svelte/transition';
    import { doc, getDoc, Timestamp, updateDoc, arrayUnion } from 'firebase/firestore';
    import { db } from '../../../firebase';

    // Stores
    import { showLoading, loggedInUser } from '../../../stores';

    // Props
    export let id;
    export let getDocument;

    // Javascript variables
    let createWebmarkTitle = '';
    let createWebmarkURL = '';
    let createWebmarkNote = '';

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
            createdAt: Timestamp.now()
        };

        const dbRef = doc(db, 'contexts', `${id}`);

        await updateDoc(dbRef, {
            webmarks: arrayUnion(data)
        });

        await getDocument();

        // clear value of input fiels
        createWebmarkTitle = '';
        createWebmarkURL = '';
        createWebmarkNote = '';
        $showLoading = false;
    }

    // Function to toggle between note and preview
    let noteActive = true;
    const toggleNotePreview = () => {
        const note = document.querySelector('.note');
        const preview = document.querySelector('.preview');
        // If note is active, make preview active
        if (note.classList.contains('tab-active')) {
            note.classList.remove('tab-active');
            preview.classList.add('tab-active');
            noteActive = false;
        } else {
            // If preview is active, make note active
            preview.classList.remove('tab-active');
            note.classList.add('tab-active');
            noteActive = true;
        }
    };
</script>

<!-- Create a WebMark Area -->
<form
    on:submit|preventDefault={createWebmark}
    class="border-2 border-primary p-5 flex flex-col rounded-xl h-fit"
>
    <div class="flex flex-row justify-between">
        {#if createWebmarkNote.length === 0}
            <div transition:fly={{ x: -100, duration: 200 }} class="w-full grid gap-4">
                <div class="w-full grid gap-4">
                    <h2 class="text-xl text-secondary">Add a URL...</h2>
                    <input
                        type="text"
                        bind:value={createWebmarkTitle}
                        class="input input-bordered input-primary w-full"
                        placeholder="Title"
                        required
                    />
                    <input
                        type="text"
                        bind:value={createWebmarkURL}
                        class="input input-bordered input-primary w-full"
                        placeholder="URL"
                        required
                    />
                </div>
            </div>
            <div
                class="divider divider-horizontal text-secondary before:bg-secondary after:bg-secondary"
            >
                OR
            </div>
        {/if}
        <div class="w-full grid gap-4">
            <h2 class="text-xl text-secondary">Add a Note...</h2>
            <div class="tabs">
                <button
                    type="button"
                    tabindex="0"
                    on:click={toggleNotePreview}
                    on:keydown={toggleNotePreview}
                    class="tab tab-lifted tab-active note text-primary">Note</button
                >
                <button
                    type="button"
                    tabindex="0"
                    on:click={toggleNotePreview}
                    on:keydown={toggleNotePreview}
                    class="tab tab-lifted preview text-primary">Preview</button
                >
            </div>
            {#if noteActive}
                <textarea
                    bind:value={createWebmarkNote}
                    class="textarea textarea-primary w-full"
                    placeholder="Supports Markdown, drag to resize"
                    rows="2"
                />
            {:else}
                <div
                    class="prose prose-sm bg-base-100 p-3 rounded-xl shadow-lg overflow-y-auto max-h-96"
                >
                    {#if createWebmarkNote}
                        {@html marked(createWebmarkNote)}
                    {:else}
                        <p>Start writing something in the note to see the output here!</p>
                    {/if}
                </div>
            {/if}
        </div>
        <div
            class="divider divider-horizontal text-secondary before:bg-secondary after:bg-secondary"
        >
            OR
        </div>
        <div class="w-full grid">
            <h2 class="text-xl text-secondary">Upload a file...</h2>
            <input type="file" class="file-input file-input-primary w-full max-w-xs" />
        </div>
    </div>
    <div class="flex justify-end gap-2">
        <button type="submit" class="btn btn-sm btn-accent mt-4"> Create </button>
        <button type="reset" class="btn btn-sm btn-secondary mt-4"> Reset </button>
    </div>
</form>

<style>
</style>
