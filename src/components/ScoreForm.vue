<template>
  <form @submit.prevent>
    <span>Hole 1</span>
    <label for="score">Score</label>
    <input id="score" type="tel" />
    <hr />
    <ToggleButton button-text="GIR">
      <font-awesome-icon :icon="['fas', 'flag']" />
    </ToggleButton>
    <ToggleButton button-text="FH">
      <font-awesome-icon :icon="['far', 'circle-check']" />
    </ToggleButton>
    <hr />
    <ToggleButton button-text="Hazard">
      <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
    </ToggleButton>
    <ToggleButton button-text="Penalty">
      <font-awesome-icon :icon="['fas', 'user-minus']" />
    </ToggleButton>
  </form>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import ToggleButton from './ToggleButton.vue';

const toggles: Ref<object> = ref({
  greenInReg: false,
  fairwayHit: false,
  hazard: false,
  penalty: false,
});

function toggle(type: string): boolean {
  // @ts-ignore
  return (toggles.value[type] = !toggles.value[type]);
}
</script>

<style lang="scss">
.score-title {
  margin-bottom: 10px;
  margin-top: 0;
}

.hole-score_form-card {
  font-size: 16px;
  margin-top: 15px;

  .hole-score_form-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  label {
    &.n-form-item-label {
    }

    span {
      font-size: 16px;
    }
  }
}
</style>
