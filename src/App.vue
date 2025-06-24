<script setup lang="ts">
import { ref } from "vue";

import InputBar from "./components/InputBar.vue";

const inputValue = ref("");
</script>

<template>
  <InputBar placeholder="Search" v-model="inputValue" />
  <p>{{ inputValue }}</p>
</template>

<style scoped></style>
