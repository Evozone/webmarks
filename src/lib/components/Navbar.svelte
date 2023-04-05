<script>
  // Imports
  import LogoutButton from "../components/LogoutButton.svelte";

  // Stores
  import { loggedInUser } from "../../stores";

  // Params
  export let path;
</script>

<div class="nav">
  <!-- This is where the user's profile picture and name will be displayed -->
  <div class="profile">
    <img
      src={$loggedInUser.picture}
      alt={$loggedInUser.name}
      class="profile-picture"
      width="50"
      height="50"
    />
    <h4>{$loggedInUser.name}</h4>
  </div>

  <!-- Breadcrumbs showing which page user is at -->
  <p>
    {$loggedInUser.name} /
    {#each path.split("/") as subpath}
      {subpath}
    {/each}
  </p>

  <LogoutButton />
</div>

<style>
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
  }

  .profile {
    display: flex;
    align-items: center;
  }

  .profile-picture {
    border-radius: 50%;
    margin-right: 1rem;
  }
</style>
