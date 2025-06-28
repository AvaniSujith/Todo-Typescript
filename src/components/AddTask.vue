<script setup lang="ts">
import { ref } from 'vue';

import { useTaskStore } from '../store/Task';

import InputBar from './InputBar.vue';

const taskStore = useTaskStore();

const taskTitle = ref<string>('');

const handleAddTask = (taskTitle: string) => {
    taskStore.addTask(taskTitle);
}

</script>
<template>

    <input-bar placeholder="Add Todo" v-model="taskTitle" @keyup.enter="handleAddTask"/>
    <button class="add-btn" @click="handleAddTask(taskTitle)">Add</button>

</template>
<style>
</style>