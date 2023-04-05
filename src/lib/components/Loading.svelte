<script>
    export let message = "Loading...";
</script>

<div class="overlay">
    <div class="loading">
        <img src="src\assets\loading.svg" alt="Loading" />
        <p>{message}</p>
    </div>
</div>

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
