<script setup lang="ts">
interface Props {
  title: string;
  content: string;
  confrimLabel?: string;
  rejectLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  confrimLabel: "Ok",
  rejectLabel: "Cancel",
});

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "reject"): void;
}>();

const onConfirm = () => {
  emit("confirm");
};

const onReject = () => {
  emit("reject");
};
</script>

<template>
  <div class="modal-container">
    <div class="modal">
      <div class="modal-content">
        <h2>{{ title }}</h2>
        <p>
          {{ content }}
        </p>
        <div class="buttons-container">
          <button class="confirm-button" @click="onConfirm">
            {{ props.confrimLabel }}
          </button>
          <button class="reject-button" @click="onReject">
            {{ props.rejectLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 30px;
}

button {
  padding: 10px 7px;
  width: 80px;
  font-size: 17px;
}

.modal-container {
  position: fixed;
  z-index: 99999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(116, 114, 114, 0.7);
}

.modal {
  padding: 20px;
  background-color: #fff;
}

.modal-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.modal-content p {
  text-align: center;
  margin-bottom: 10px;
  font-size: 21px;
}

.buttons-container {
  display: flex;
  gap: 20px;
}

.confirm-button {
  background-color: #c5172e;
}

.reject-button {
  background-color: #eee;
}
</style>
