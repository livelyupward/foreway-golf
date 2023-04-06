<template>
  <n-form
    @submit.prevent="submitScoreForHole"
    v-if="currentHoleInScoreModal"
    label-width="auto"
    :style="{
      maxWidth: '640px',
    }"
    class="hole-score_form-card"
  >
    <div class="hole-score_form-group">
      <n-form-item label="Strokes">
        <n-input-number v-model:value="scoreData.strokes" placeholder="# of strokes" />
      </n-form-item>
      <n-form-item label="Putts">
        <n-input-number v-model:value="scoreData.putts" placeholder="# of putts" />
      </n-form-item>
    </div>
    <div class="hole-score_form-group">
      <n-space>
        <n-checkbox v-model:checked="scoreData.gir">GIR</n-checkbox>
      </n-space>
      <n-space>
        <n-checkbox v-model:checked="scoreData.fairway">Fairway</n-checkbox>
      </n-space>
    </div>
    <n-list class="hole-score-form-info">
      <n-list-item class="hole-score-form-info-item"><span>Par: </span>{{ holeObjFromSelect.par }}</n-list-item>
      <n-list-item class="hole-score-form-info-item"><span>Yards: </span>{{ holeObjFromSelect.yardage }}</n-list-item>
      <n-list-item class="hole-score-form-info-item">
        <span>Handicap: </span>{{ holeObjFromSelect.handicap }}
      </n-list-item>
    </n-list>
    <n-button attr-type="submit" :justify="'center'" class="hole-score-form-button">Save score</n-button>
  </n-form>
</template>

<script setup lang="ts">
import { NButton, NSpace, NList, NListItem, NFormItem, NInputNumber, NForm, NCheckbox, useMessage } from 'naive-ui';
import { computed, ComputedRef, ref, Ref, PropType } from 'vue';
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';
import isDebug from '../plugins/debugConsole';
import type { Score, Course, Hole } from '../store';

const message = useMessage();
const store = mainStore();
const { submitScore, submitEditedScore, closeScoreModal } = store;
const { getUser, getCurrentRound, currentHoleInScoreModal } = storeToRefs(store);

const props = defineProps<ScoreProps>();

let existingScore: Ref<boolean> = ref(false);
const holeFromSelect: ComputedRef<number | undefined> = computed((): number | undefined => {
  return props.selectedHole;
});

const holeObjFromSelect: ComputedRef<Hole> = computed((): Hole => {
  if (!props.selectedHole) throw Error('Selected hole is undefined.');
  isDebug() && console.log('course holes in ScoreForm:: ', props!.course.holes);
  return props.course.holes![props.selectedHole - 1];
});

const scoreData: Ref<Score> = ref({
  strokes: 0,
  putts: 0,
  gir: false,
  fairway: false,
  roundId: getCurrentRound.value.id ?? undefined,
  holeId: holeFromSelect.value ?? undefined,
  userId: getUser.value !== null ? getUser.value.id : undefined,
});

if (props.selectedHole && getCurrentRound.value.scores[props.selectedHole - 1]?.strokes) {
  existingScore.value = true;
  scoreData.value = getCurrentRound.value.scores[props.selectedHole - 1];
}

async function submitScoreForHole() {
  if (scoreData.value.roundId && scoreData.value.holeId !== undefined && scoreData.value.userId) {
    const newScore = existingScore.value
      ? await submitEditedScore(scoreData.value)
      : await submitScore(scoreData.value);
    if (!newScore.error) {
      existingScore.value = false;
      message.success('Score saved!');
      await closeScoreModal();
    }

    return newScore;
  } else {
    isDebug() && console.log('sent from scoreData: ', scoreData.value);
    console.error('Error: please provide a hole, a round, and a user id.');
  }
}

interface ScoreProps {
  course: Course;
  selectedHole: number | undefined;
}
</script>

<style lang="scss">
.score-title {
  margin-bottom: 10px;
  margin-top: 0;
}

.hole-score_form-card {
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
