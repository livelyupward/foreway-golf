<template>
  <form @submit.prevent="submitScoreForHole" v-if="selectedHole" class="hole-score-form">
    <n-card>
      <h3 class="score-title">
        <small class="score-title-hole">Hole #{{ getHoleFromSelect.number }}</small>
        Score
      </h3>
      <input class="score-input" type="tel" v-model.number.lazy="scoreData.strokes" />
      <label class="score-label" for="gir"
        ><input id="gir" class="score-checkbox" type="checkbox" v-model="scoreData.gir" />GIR</label
      >
      <label class="score-label" for="fh"
        ><input id="fh" class="score-checkbox" type="checkbox" v-model="scoreData.fairway" />FH</label
      >
      <n-list class="hole-score-form-info">
        <n-list-item class="hole-score-form-info-item"><span>Par: </span>{{ getHoleFromSelect.par }}</n-list-item>
        <n-list-item class="hole-score-form-info-item"><span>Yards: </span>{{ getHoleFromSelect.yardage }}</n-list-item>
        <n-list-item class="hole-score-form-info-item"
          ><span>Handicap: </span>{{ getHoleFromSelect.handicap }}</n-list-item
        >
      </n-list>
    </n-card>
    <n-button attr-type="submit" :justify="'center'" class="hole-score-form-button">Save score</n-button>
  </form>
</template>

<script setup lang="ts">
import { NButton, NCard, NList, NListItem, useMessage } from 'naive-ui';
import { computed, ref, Ref } from 'vue';
import { mainStore } from '../store';

const message = useMessage();
const store = mainStore();
const { submitScore } = store;

const props = defineProps({
  course: Object,
  selectedHole: Number,
});

const getHoleFromSelect = computed(() => {
  return props.course.holes[parseInt(props.selectedHole.value)];
});

const scoreData: Ref<Score> = ref({
  strokes: null,
  gir: false,
  fairway: false,
  roundId: store.getCurrentRound.value.id,
  holeId: 1,
  userId: 1,
});

async function submitScoreForHole() {
  console.log('hello');
  if (scoreData.value.roundId && scoreData.value.holeId && scoreData.value.userId) {
    const newScore = await submitScore(scoreData.value);
    if (!newScore.error) message.success('Score saved!');

    return newScore;
  } else {
    console.error('Error: please provide a hole, a round, and a user id.');
  }
}
</script>

<style scoped></style>
