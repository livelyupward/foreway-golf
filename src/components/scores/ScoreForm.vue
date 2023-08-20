<template>
  <div class="score-form_container" v-if="selectedHole">
    <div class="score-form_modal">
      <div class="score-form_modal-header">
        <h2 class="score-form_hole page-title">Hole {{ selectedHole.number }}</h2>
        <small class="score-form_par-label">Par {{ selectedHole.par }}</small>
      </div>
      <form class="score-form_form" @submit.prevent>
        <div class="score-form_hole-info"></div>
        <div class="form-group-inline full-width">
          <label class="form-label strokes" for="score">Strokes</label>
          <button
            @click="() => (scoreValues.strokes ? --scoreValues.strokes : '')"
            class="score-form_strokes-button decrease"
          >
            <font-awesome-icon class="score-form_icon-button" :icon="['fas', 'circle-minus']" />
          </button>
          <span class="score-form_value">{{ scoreValues.strokes }}</span>
          <button
            @click="() => (scoreValues.strokes ? ++scoreValues.strokes : '')"
            class="score-form_strokes-button increase"
          >
            <font-awesome-icon class="score-form_icon-button" :icon="['fas', 'circle-plus']" />
          </button>
        </div>
        <div class="form-group-inline full-width">
          <label class="form-label putts" for="putts">Putts</label>
          <button
            @click="() => (scoreValues.putts ? --scoreValues.putts : '')"
            class="score-form_putts-button decrease"
          >
            <font-awesome-icon class="score-form_icon-button" :icon="['fas', 'circle-minus']" />
          </button>
          <span class="score-form_value">{{ scoreValues.putts }}</span>
          <button
            @click="() => (scoreValues.putts ? ++scoreValues.putts : '')"
            class="score-form_putts-button increase"
          >
            <font-awesome-icon class="score-form_icon-button" :icon="['fas', 'circle-plus']" />
          </button>
        </div>

        <div class="score-form_toggle-button-group">
          <div
            v-show="parseInt(selectedHole.par) > 3"
            class="score-form_toggle-button fh"
            :class="`${scoreValues.toggles.fairwayHit ? 'checked' : ''}`"
            @click="toggleValue('fairwayHit')"
          >
            <font-awesome-icon :icon="['far', 'circle-check']" />
            <span class="score-form_toggle-button_text">Fairway</span>
          </div>
          <div
            class="score-form_toggle-button gir"
            :class="`${scoreValues.toggles.greenInReg ? 'checked' : ''}`"
            @click="toggleValue('greenInReg')"
          >
            <font-awesome-icon :icon="['fas', 'flag']" />
            <span class="score-form_toggle-button_text">GIR</span>
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

        <button @click="saveScoreForHole" class="score-form_submit-button">Save Score</button>
        <button @click.prevent="$emit('closeForm')" class="score-form_cancel-button">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { mainStore } from '../../store';
import { type ScoreForSubmit } from '../../store';
import { storeToRefs } from 'pinia';

const store = mainStore();
const { submitScore, submitEditedScore } = store;
const { getUser, getCurrentRound, getCurrentCourse } = storeToRefs(store);

const emit = defineEmits(['closeForm', 'scoreSubmitted']);
const props = defineProps({
  selectedHole: Object,
  existingScore: Object,
});

const scoreValues: Ref<ScoreForSubmit> = ref({
  strokes: props.selectedHole ? props.selectedHole.par : undefined,
  putts: 2,
  toggles: {
    greenInReg: false,
    fairwayHit: false,
    hazard: false,
    penalty: false,
  },
  penaltyStrokes: undefined,
});

if (props.existingScore) {
  console.log('existing score called from card: ', props.existingScore);
  scoreValues.value = {
    strokes: props.existingScore.strokes,
    putts: props.existingScore.putts,
    toggles: {
      greenInReg: props.existingScore.gir,
      fairwayHit: props.existingScore.fairway,
      hazard: props.existingScore.hazard,
      penalty: props.existingScore.penalty !== undefined ? props.existingScore.penalty : undefined,
    },
    penaltyStrokes: props.existingScore.penaltyStrokes !== undefined ? props.existingScore.penaltyStrokes : undefined,
  };
}

function toggleValue(type: string): boolean {
  // @ts-ignore
  return (scoreValues.value.toggles[type] = !scoreValues.value.toggles[type]);
}

async function saveScoreForHole() {
  if (props.existingScore) {
    await submitEditedScore({
      strokes: scoreValues.value.strokes,
      putts: scoreValues.value.putts,
      toggles: {
        greenInReg: scoreValues.value.toggles.greenInReg,
        fairwayHit: scoreValues.value.toggles.fairwayHit,
        hazard: scoreValues.value.toggles.hazard,
        penalty: scoreValues.value.toggles.penalty,
      },
      roundId: getCurrentRound.value.id,
      holeId: props.selectedHole ? props.selectedHole.number : undefined,
      userId: getUser.value ? getUser.value.id : undefined,
      scoreId: props.existingScore.id,
    });
  } else {
    await submitScore({
      strokes: scoreValues.value.strokes,
      putts: scoreValues.value.putts,
      toggles: {
        greenInReg: scoreValues.value.toggles.greenInReg,
        fairwayHit: scoreValues.value.toggles.fairwayHit,
        hazard: scoreValues.value.toggles.hazard,
        penalty: scoreValues.value.toggles.penalty,
      },
      roundId: getCurrentRound.value.id,
      holeId: props.selectedHole ? props.selectedHole.number : undefined,
      userId: getUser.value ? getUser.value.id : undefined,
    });
  }
  console.log('saved score for the hole');
  emit('scoreSubmitted');
}
</script>

<style lang="scss">
.score-form_container,
.close-round_container {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.65);
  bottom: 0;

  display: flex;
  justify-content: center;
  left: 0;
  padding: 10px;
  position: fixed;
  right: 0;
  top: 0;
}

.score-form_strokes-button,
.score-form_putts-button {
  background: none;
  border: none;
  color: $primary;
  font-size: 1.5rem;
  padding: 0;
}
.score-form_icon-button {
  background: none;
  border: none;
  color: $primary;
  font-size: 2rem;
  padding: 0;
}

.score-form_hole {
  color: #fff;
  margin: 0 0 0.375rem;
}

.score-form_modal {
  @include rounded-corners;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  .score-form_modal-header {
    background-color: $primary;
    border: 1px solid $primary;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    color: #fff;
    padding: 20px;
    text-align: center;
  }

  .score-form_par-label {
    font-size: 1rem;
  }

  .score-form_form {
    padding: 20px;
  }
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
    span {
      font-size: 16px;
    }
  }
}

.form-input,
.form-label {
  font-size: 1.875rem;
}

.form-group-inline {
  align-items: center;
  display: flex;
  margin: 0 auto 15px;
  width: 70%;

  .score-form_value {
    font-size: 1.75rem;
    margin: 0 1rem;
  }

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
      font-size: 1.75rem;
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
  font-size: 1.75rem;
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
  //border-radius: 4px;
  //color: #fff;
  font-size: 1.75rem;
  margin: 10px 0 0;
  //padding: 5px 0;
  width: 100%;
}

.score-form_cancel-button {
  @include red-btn;
  //background-color: #d32f2f;
  //border: 1px solid #d32f2f;
}

.score-form_submit-button {
  @include green-btn;
  //background-color: cadetblue;
  //border: 1px solid cadetblue;
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
