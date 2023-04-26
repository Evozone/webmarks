<script>
    // Imports
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { loggedInUser } from "../../stores";

    // Components
    import GoogleLoginButton from "../components/auth/GoogleLoginButton.svelte";
    import ThemeSwitcher from "../components/util/ThemeSwitcher.svelte";

    // Exports
    export let location;

    onMount(async () => {
        // If user is logged in, wait for path to change
        if ($loggedInUser) {
            const path = window.location.pathname;
            if (path === "/") {
                navigate("/dashboard");
            }
        }
    });
</script>

<main class="min-h-screen grid place-items-center">
    <div class="absolute top-0 right-0 p-4">
        <ThemeSwitcher />
    </div>
    <div class="grid grid-cols-2 gap-8 p-16 w-full min-h-screen">
        <img
            src="src\assets\logo.svg"
            alt="WebMarks Logo"
            class="row-span-2 logo"
        />
        <h2
            class="text-4xl font-bold text-center grid place-items-center text-white"
        >
            Don't just save your bookmarks, <br />
            save the context as well !
        </h2>
        <!-- This button is important -->
        <p />
        <!-- This button is important -->

        <h1
            class="text-6xl font-bold text-center grid place-items-center text-white
        "
        >
            WebMarks
        </h1>
        <div class="grid place-items-center">
            <GoogleLoginButton />
        </div>
    </div>
</main>

<style>
    main {
        background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0.6) 100%
        );
        background-size: cover;
    }

    .logo {
        width: 350px;
        height: auto;
        justify-self: center;
    }
</style>
