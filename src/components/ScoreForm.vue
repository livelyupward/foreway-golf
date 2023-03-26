<template>
  <n-form
    @submit.prevent="submitScoreForHole"
    v-if="currentHoleInScoreModal !== null"
    label-width="auto"
    :style="{
      maxWidth: '640px',
    }"
    class="hole-score_form-card"
  >
    <div class="hole-score_form-group">
      <n-form-item label="Strokes" path="inputValue">
        <n-input v-model:value.number="scoreData.strokes" placeholder="# of strokes" />
      </n-form-item>
      <n-form-item label="Putts" path="inputValue">
        <n-input v-model:value.number="scoreData.putts" placeholder="# of putts" />
      </n-form-item>
    </div>
    <div class="hole-score_form-group">
      <n-checkbox-group v-model:value="scoreData.gir">
        <n-form-item label="Green in Reg." path="checkboxGroupValue">
          <n-space>
            <n-checkbox></n-checkbox>
          </n-space>
        </n-form-item>
      </n-checkbox-group>
      <n-checkbox-group v-model:value="scoreData.fairway">
        <n-form-item label="Fairway Hit" path="checkboxGroupValue">
          <n-space>
            <n-checkbox></n-checkbox>
          </n-space>
        </n-form-item>
      </n-checkbox-group>
    </div>
    <n-list class="hole-score-form-info">
      <n-list-item class="hole-score-form-info-item"><span>Par: </span>{{ getHoleFromSelect.par }}</n-list-item>
      <n-list-item class="hole-score-form-info-item"><span>Yards: </span>{{ getHoleFromSelect.yardage }}</n-list-item>
      <n-list-item class="hole-score-form-info-item">
        <span>Handicap: </span>{{ getHoleFromSelect.handicap }}
      </n-list-item>
    </n-list>
    <n-button attr-type="submit" :justify="'center'" class="hole-score-form-button">Save score</n-button>
  </n-form>
</template>

<script setup lang="ts">
import { NButton, NSpace, NList, NListItem, useMessage } from 'naive-ui';
import { computed, ref, Ref } from 'vue';
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';
import isDebug from '../plugins/debugConsole';

const message = useMessage();
const store = mainStore();
const { submitScore } = store;
const { getUser, getCurrentRound, currentHoleInScoreModal } = storeToRefs(store);
import { NFormItem, NInput, NForm, NCheckbox } from 'naive-ui';

const props = defineProps({
  course: Object,
  selectedHole: Number,
});

const holeFromSelect = computed(() => {
  return props.selectedHole;
});
// TODO: find why Map isn't listing the arrays in correct order. Might have to avoid Map and use arrays.
const getHoleFromSelect = computed(() => {
  isDebug() && console.log('course holes in ScoreForm:: ', props.course.holes);
  return props.selectedHole > 0 ? props.course.holes[props.selectedHole - 1] : null;
});

const scoreData: Ref<Score> = ref({
  strokes: undefined,
  gir: false,
  fairway: false,
  roundId: getCurrentRound.value.id,
  holeId: holeFromSelect,
  userId: getUser.value.id,
});

async function submitScoreForHole() {
  isDebug() && console.log('hello');
  if (scoreData.value.roundId && scoreData.value.holeId !== undefined && scoreData.value.userId) {
    const newScore = await submitScore(scoreData.value);
    if (!newScore.error) message.success('Score saved!');

    return newScore;
  } else {
    isDebug() && console.log('sent from scoreData: ', scoreData.value);
    // TODO: error coming from here on submit of a score, recently changed the scoreData structure to be dynamic
    console.error('Error: please provide a hole, a round, and a user id.');
  }
}

interface Score {
  strokes?: number;
  putts?: number;
  gir?: boolean;
  fairway?: boolean;
  roundId?: number;
  holeId?: number;
  userId?: number;
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
