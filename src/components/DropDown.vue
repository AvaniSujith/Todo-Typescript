<script setup lang="ts">
import { ref } from "vue";

const selectedValue = ref<string>("all");

const options = [
  { value: "all", label: "All" },
  { value: "complete", label: "Complete" },
  { value: "incomplete", label: "Incomplete" },
];

const emit = defineEmits<{
  (e: "change", selectedValue: string): void;
}>();

const onChange = (event: Event) => {
  const selectChangeValue = (event.target as HTMLSelectElement).value;
  emit("change", selectChangeValue);
};
</script>

<template>
  <div class="dropdown-container">
    <select
      v-model="selectedValue"
      class="task-category"
      name="category"
      @change="onChange"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

  </div>
</template>

<style scoped>
.dropdown-container {
  width: 100%;
}

.task-category {
  border: 2px solid #eee;
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
  background: transparent;
  width: 100%;
  font-size: 18px;
  cursor: pointer;
}

</style>
