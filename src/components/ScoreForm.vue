<template>
  <form @submit.prevent>
    <h2 class="score-form_hole page-title">Hole 1</h2>
    <hr />
    <div class="score-form_hole-info"></div>
    <div class="form-group-inline full-width">
      <label class="form-label strokes" for="score">Strokes</label>
      <input class="form-input center-content" id="score" type="tel" v-model="scoreValues.strokes" required />
    </div>
    <div class="form-group-inline full-width">
      <label class="form-label putts" for="putts">Putts</label>
      <input class="form-input center-content" id="putts" type="tel" v-model="scoreValues.putts" />
    </div>

    <div class="score-form_toggle-button-group">
      <div
        class="score-form_toggle-button gir"
        :class="`${scoreValues.toggles.greenInReg ? 'checked' : ''}`"
        @click="toggleValue('greenInReg')"
      >
        <font-awesome-icon :icon="['fas', 'flag']" />
        <span class="score-form_toggle-button_text">GIR</span>
      </div>
      <div
        class="score-form_toggle-button fh"
        :class="`${scoreValues.toggles.fairwayHit ? 'checked' : ''}`"
        @click="toggleValue('fairwayHit')"
      >
        <font-awesome-icon :icon="['far', 'circle-check']" />
        <span class="score-form_toggle-button_text">Fairway</span>
      </div>
      <div
        class="score-form_toggle-button hazard"
        :class="`${scoreValues.toggles.hazard ? 'checked' : ''}`"
        @click="toggleValue('hazard')"
      >
        <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
        <span class="score-form_toggle-button_text">Hazard</span>
      </div>
      <div
        class="score-form_toggle-button penalty"
        :class="`${scoreValues.toggles.penalty ? 'checked' : ''}`"
        @click="toggleValue('penalty')"
      >
        <font-awesome-icon :icon="['fas', 'user-minus']" />
        <span class="score-form_toggle-button_text">Penalty</span>
      </div>
    </div>

    <Transition name="bounce">
      <div class="form-group-inline full-width" v-show="scoreValues.toggles.penalty">
        <label class="form-label penalty" for="penalty">Penalty Strokes</label>
        <input class="form-input center-content" id="penalty" type="tel" v-model="scoreValues.penaltyStrokes" />
      </div>
    </Transition>

    <button class="score-form_submit-button">Save Score</button>
    <button class="score-form_cancel-button">Cancel</button>
  </form>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';

const scoreValues: Ref<object> = ref({
  strokes: undefined,
  putts: undefined,
  // countPutts: false,
  toggles: {
    greenInReg: false,
    fairwayHit: false,
    hazard: false,
    penalty: false,
  },
  penaltyStrokes: undefined,
});

function toggleValue(type: string): boolean {
  // @ts-ignore
  return (scoreValues.value.toggles[type] = !scoreValues.value.toggles[type]);
}
</script>

<style lang="scss">
.score-form_hole {
  margin: 0 0 1rem;
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

  &.full-width {
    width: 100%;

    .form-input,
    .form-label {
      font-size: 36px;
      font-weight: 700;
    }

    .form-label.penalty {
      align-items: center;
      display: flex;
      font-size: 1.75rem;
    }
  }
}

.score-form_toggle-button-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  .score-form_toggle-button {
    border: 1px solid #ddd;
    flex-basis: 50%;
  }

  & ~ .form-group-inline.full-width {
    margin: 10px 0;
  }
}

.score-form_toggle-button {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 32px;
  justify-content: center;
  min-height: 100px;
  transition: all 250ms ease-in;

  &.checked {
    transition: all 250ms ease-in;
  }

  &.gir.checked {
    background-color: #2a7e4f;
    color: #fff;
  }

  &.fh.checked {
    background-color: lightgreen;
    color: #333;
  }

  &.hazard.checked {
    background-color: #c54444;
    color: #fff;
  }

  &.penalty.checked {
    background-color: orange;
    color: #333;
  }
}

.score-form_submit-button,
.score-form_cancel-button {
  border-radius: 4px;
  color: #fff;
  font-size: 2.25rem;
  margin: 10px 0 0;
  padding: 5px 0;
  width: 100%;
}

.score-form_cancel-button {
  background-color: #d32f2f;
  border: 1px solid #d32f2f;
}

.score-form_submit-button {
  background-color: cadetblue;
  border: 1px solid cadetblue;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
