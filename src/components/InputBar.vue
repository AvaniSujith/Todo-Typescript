<script setup lang="ts">
interface Props {
  modelValue: string;
  placeholder?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const handleInput = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value;
  emit("update:modelValue", inputValue);
};
</script>

<template>
  <input
    class="input-bar"
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<style scoped>
.input-bar {
  border: 2px solid #eee;
  padding: 10px;
  border-radius: 8px;
  font-size: 18px;
  width: 100%;
  height: 100%;
}
</style>
