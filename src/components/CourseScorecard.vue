<template>
  <div id="course-scorecard" v-if="holes.length">
    <div class="scorecard-table_container">
      <n-table class="scorecard-table front" :bordered="true" :single-line="false" size="large">
        <thead>
          <tr class="scorecard-table_row hole-number">
            <th>Hole</th>
            <th>Yards</th>
            <th>Par</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(hole, index) in props.holes">
            <th>{{ hole.number }}</th>
            <td>{{ hole.yardage }}</td>
            <td>{{ hole.par }}</td>
            <td @click="openScoreModal">
              {{ getCurrentRound.scores[index] ? getCurrentRound.scores[index].strokes : '' }}
            </td>
          </tr>
        </tbody>
      </n-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTable } from 'naive-ui';
import { mainStore } from '../store';

const store = mainStore();
const { getCurrentRound, openScoreModal } = store;

const props = defineProps({
  holes: Array,
});

console.log('Scorecard holes length: ', props.holes);
</script>

<style lang="scss" scoped>
.scorecard-table_container {
  overflow-x: auto;

  .scorecard-table_row {
    th {
      font-weight: 400;
    }

    &.hole-number {
      th {
        color: #18a058;
        font-weight: 700;
      }
    }

    &.score {
      td,
      th {
        color: #333;
        font-weight: 500;
      }
    }

    &.par,
    &.yards {
      line-height: 0.75;
    }
  }
}

.scorecard-table {
  text-align: center;
}
</style>
