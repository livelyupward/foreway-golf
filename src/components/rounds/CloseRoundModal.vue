<template>
  <div class="close-round_container" v-if="isClosing">
    <div class="close-round_modal">
      <p>Are you sure you want to close this round? This cannot be undone.</p>
      <button class="close-round_action-button_cancel" @click="$emit('closeModal')">Cancel</button>
      <button class="close-round_action-button_close" @click="$emit('closeRound')">End & Submit Round</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isClosing: Boolean,
});
const emit = defineEmits(['closeRound', 'closeModal']);
</script>

<style lang="scss" scoped>
.close-round_modal {
  background-color: #fff;
  margin-bottom: 10rem;
  padding: 1rem;
}

.close-round_action-button_cancel {
  @include grey-btn;
  margin-bottom: 1rem;
}

.close-round_action-button_close {
  @include blue-btn;
  width: 100%;
}
</style>
