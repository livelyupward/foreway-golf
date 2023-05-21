<template>
  <div class="toggle-button" :class="`${props.buttonClass} ${passedValue ? 'checked' : ''}`" @click="toggleValue">
    <slot></slot>
    <span class="toggle-button_text">{{ props.buttonText }}</span>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
  buttonClass: String,
  buttonText: String,
  passedValue: Boolean,
});

const { passedValue } = toRefs(props);
function toggleValue() {
  passedValue.value = !passedValue.value;
}
</script>

<style lang="scss" scoped></style>
