<script setup lang="ts">
defineProps<{
    content: string;
}>()
</script>

<template>
    <div class="modal-container">
        <div class="modal">
            <p>
            {{ content }}
        </p>
        <div class="buttons-container">
            <button class="delete-btn">Delete</button>
            <button class="cancel-btn">Cancel</button>
        </div>
        </div>
    </div>
</template>

<style scoped>
.modal-container{
    position: fixed;
    z-index: 99999;
    width: 100vw;
    height: 100vh;
}
</style>