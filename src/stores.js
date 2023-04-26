import { writable } from "svelte/store";
import jwt_decode from "jwt-decode";

export const createloggedInUser = () => {
    // Create a store with a value of null
    const { subscribe, set, update } = writable(null);

    // Create a login function
    const login = (token) => {
        // Decode the token
        const decoded = jwt_decode(JSON.parse(token));
        // Set the store value to the decoded token
        set(decoded);
    };

    // Return the store
    return {
        subscribe,
        set,
        update,
        login,
    };
};

// Create the store 
// Store contents [loggedInUser, selectedTheme, showLoading]
export const loggedInUser = createloggedInUser();

export const selectedTheme = writable("default");

export const showLoading = writable(false);
