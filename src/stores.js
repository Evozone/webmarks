import { writable } from "svelte/store";
import { auth } from "./firebase";

export const loggedInUser = writable(null, function start(set) {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            set(user);
        } else {
            set(null);
        }
    });

    return function stop() {
        unsubscribe();
    };
});
