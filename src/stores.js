import { writable } from "svelte/store";
import { auth } from "./firebase";

export const loggedInUser = writable(null, function start(set) {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        set(user);
    });

    return function stop() {
        unsubscribe();
    };
});
