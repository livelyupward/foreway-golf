<template>
  <form @submit.prevent>
    <h2 class="score-form_hole">Score for Hole 1</h2>
    <div class="form-group-inline">
      <label class="form-label" for="score">Score</label>
      <input class="form-input center-content" id="score" type="tel" />
    </div>
    <div class="form-group-inline">
      <label class="form-label" for="putts">Putts</label>
      <input class="form-input center-content" id="putts" type="tel" />
    </div>
    <hr />
    <div class="toggle-button-group">
      <div
        class="toggle-button gir"
        :class="`${toggles.greenInReg ? 'checked' : ''}`"
        @click="toggleValue('greenInReg')"
      >
        <font-awesome-icon :icon="['fas', 'flag']" />
        <span class="toggle-button_text">GIR</span>
      </div>
      <div
        class="toggle-button fh"
        :class="`${toggles.fairwayHit ? 'checked' : ''}`"
        @click="toggleValue('fairwayHit')"
      >
        <font-awesome-icon :icon="['far', 'circle-check']" />
        <span class="toggle-button_text">FH</span>
      </div>
    </div>
    <div class="toggle-button-group">
      <div class="toggle-button hazard" :class="`${toggles.hazard ? 'checked' : ''}`" @click="toggleValue('hazard')">
        <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
        <span class="toggle-button_text">GIR</span>
      </div>
      <div class="toggle-button penalty" :class="`${toggles.penalty ? 'checked' : ''}`" @click="toggleValue('penalty')">
        <font-awesome-icon :icon="['fas', 'user-minus']" />
        <span class="toggle-button_text">FH</span>
      </div>
    </div>
    <hr />
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

function toggleValue(type: string): boolean {
  // @ts-ignore
  return (toggles.value[type] = !toggles.value[type]);
}
</script>

<style lang="scss">
.score-form_hole {
  font-size: 2.75rem;
  margin: 0 0 2rem;
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

.form-input,
.form-label {
  font-size: 32px;
}

.form-group-inline {
  display: flex;
  margin: 0 auto 15px;
  width: 70%;

  input {
    width: 20%;
  }

  label {
    width: 80%;
  }
}

.toggle-button-group {
  display: flex;

  .toggle-button {
    flex-basis: 50%;
  }
}

.toggle-button {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 32px;
  justify-content: center;
  min-height: 100px;

  &.gir.checked {
    background-color: seagreen;
    color: #333;
  }

  &.fh.checked {
    background-color: lightgreen;
    color: #333;
  }

  &.hazard.checked {
    background-color: indianred;
    color: #333;
  }

  &.penalty.checked {
    background-color: orange;
    color: #333;
  }
}
</style>
