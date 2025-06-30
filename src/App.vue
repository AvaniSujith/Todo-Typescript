<script setup lang="ts">
import { ref } from "vue";
import DropDown from "./components/DropDown.vue";

const selectedValue = ref("all");

function handleChange(value: string) {
  selectedValue.value = value;
}
</script>

<template>
  <div class="outer-container">
    <drop-down @change="handleChange" />
    <p>{{ selectedValue }}</p>
  </div>
</template>

<style scoped>
.outer-container {
  background-color: #fff;
  max-height: 650px;
  height: 100%;
  width: 30%;
  margin: auto;
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-radius: 12px;
}
</style>
