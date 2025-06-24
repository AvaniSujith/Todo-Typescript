<script setup lang="ts">
import { ref } from "vue";

import InputBar from "./components/InputBar.vue";
import AddTask from "./components/AddTask.vue";

const inputValue = ref("");

const handleInput = (value: string) => {
  inputValue.value = value;
};
</script>

<template>
  <div class="outer-container">
    <InputBar
      placeholder="Search"
      :modelValue="inputValue"
      @input="handleInput"
    />
    <p>{{ inputValue }}</p>

    <p>Add Task</p>
    <add-task />
  </div>
</template>

<style scoped>
.outer-container {
  background-color: #fff;
  max-height: 650px;
  height: 100%;
  max-width: 30%;
  width: 100%;
  margin: auto;
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-radius: 12px;
}
</style>
