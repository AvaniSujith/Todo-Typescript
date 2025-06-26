<script setup lang="ts">
defineProps<{
    title: string;
    content: string;
}>();
</script>

<template>
    <div>
        <h1 class="empty-title">{{ title }}</h1>
        <p class="emtpy-label">{{ content }}</p>
    </div>
</template>

<style scoped></style>