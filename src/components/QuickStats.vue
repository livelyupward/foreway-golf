<template>
  <div class="foreway-stats" v-if="yearStats">
    <span class="foreway-stats_row">
      <span class="foreway-stats-highlight">Handicap: </span> {{ playerHandicap }}
      <span class="foreway-stats-info" v-if="playerHandicap === 'N/A'">
        <font-awesome-icon :icon="['fas', 'circle-info']" />
      </span>
    </span>
    <span class="foreway-stats_row">
      <span class="foreway-stats-highlight">Scoring average: </span>
      {{ averageScore }}
    </span>
    <span class="foreway-stats_row">
      <span class="foreway-stats-highlight">Putts/hole: </span>
      {{ averagePutts }}
    </span>
    <!--    <span class="foreway-stats_row">GIR %: 31</span>-->
    <!--    <span class="foreway-stats_row">Fairway %: 42</span>-->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { mainStore } from '../store';
const { getThisYearsStats } = mainStore();

const yearStats = await getThisYearsStats();

const playerHandicap = computed(() => {
  if (yearStats.length < 8) return 'N/A';
});

const averageScore = computed(() => {
  let totalStrokes = 0;
  let roundCount = 0;

  yearStats.forEach((round: any) => {
    if (round.scores.length === 18) {
      ++roundCount;
      round.scores.forEach((score: any) => {
        totalStrokes += parseInt(score.strokes);
      });
    }
  });

  return (totalStrokes / roundCount) % 2 === 0 ? totalStrokes / roundCount : (totalStrokes / roundCount).toFixed(2);
});

const averagePutts = computed(() => {
  let totalPutts = 0;
  let puttsTracked = 0;

  yearStats.forEach((round: any) => {
    if (round.scores.length === 18) {
      round.scores.forEach((score: any) => {
        if (score.putts) {
          totalPutts += parseInt(score.putts);
          ++puttsTracked;
        }
        console.log('Score: ', score);
      });
    }
  });

  console.table({
    totalPutts,
    puttsTracked,
  });

  return (totalPutts / puttsTracked).toFixed(2);
});
</script>

<style lang="scss" scoped>
.foreway-stats_row {
  align-items: center;
  display: flex;
  font-size: 1.125rem;

  &:not(:first-of-type):not(:last-of-type) {
    margin: 10px 0;
  }

  .foreway-stats-highlight {
    color: $primary;
    font-weight: 700;
    margin-right: 5px;
  }
}

.foreway-stats-info {
  align-items: center;
  display: inline-flex;
  font-size: 1rem;
  margin-left: 8px;
}
</style>
