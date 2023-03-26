// Write a store to store the user's data from firebase
// This is a singleton class

import { readable, writable } from "svelte/store";
import { auth } from "./firebase";

export const user = readable(null, function start(set) {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        set(user);
    });

    return function stop() {
        unsubscribe();
    };
});
