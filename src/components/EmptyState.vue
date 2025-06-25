<script setup lang="ts">
const props = defineProps<{
    message: String;
    }>();

const emit = defineEmits<{
    (e: 'exit', message: string) : void
}>();

const handleBackButton = () =>{
    emit('exit', 'back button clicked')
}

</script>

<template>
    <div>
        <p class="emtpy-label">{{ props.message }}</p>
        <button class="empty-btn" @click="handleBackButton">Go Back</button>
    </div>
</template>

<style scoped></style>