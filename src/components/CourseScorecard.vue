<template>
  <div id="course-scorecard" v-if="holes?.length">
    <div class="scorecard-table_container">
      <n-table class="scorecard-table front" :bordered="true" :single-line="false" size="large">
        <thead>
          <tr class="scorecard-table_row heading">
            <th class="scorecard-table_row-header">Hole</th>
            <th class="scorecard-table_row-header">Yards</th>
            <th class="scorecard-table_row-header">Par</th>
            <th class="scorecard-table_row-header">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(hole, index) in props.holes" class="scorecard-table_row">
            <th class="scorecard-table_row-header">{{ hole.number }}</th>
            <td class="scorecard-table_row-item">{{ hole.yardage }}</td>
            <td class="scorecard-table_row-item">{{ hole.par }}</td>
            <td
              @click="activateScoreFormFromScorecard(hole.number)"
              class="scorecard-table_row-item score"
              :class="strokeCalculate(getCurrentRound.scores[index]?.strokes, hole.par)"
            >
              <span class="scorecard-table_row-item_span">{{
                getCurrentRound.scores[index] ? getCurrentRound.scores[index].strokes : ''
              }}</span>
            </td>
          </tr>
        </tbody>
      </n-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTable } from 'naive-ui';
import { Course, mainStore } from '../store';
import { storeToRefs } from 'pinia';
import type { Hole } from '../store';

const store = mainStore();
const { openScoreModal, setHoleInScoreModal } = store;
const { getCurrentRound } = storeToRefs(store);

const props = defineProps<HoleProp>();

async function activateScoreFormFromScorecard(holeNumber: number): Promise<void> {
  await setHoleInScoreModal(holeNumber);
  await openScoreModal();
}

const strokeCalculate = (score: number | null, par: number) => {
  if (score === null) return '';
  if (score - par >= 2) {
    return 'double-bogey';
  } else if (score - par === 1) {
    return 'bogey';
  } else if (score - par === 0) {
    return 'par';
  } else if (score - par === -1) {
    return 'birdie';
  } else if (score - par <= -2) {
    return 'eagle';
  }
};

console.log('Scorecard holes length: ', props.holes);

interface HoleProp {
  holes: Array<Hole>;
}
</script>

<style lang="scss">
.scorecard-table_container {
  overflow-x: auto;

  .scorecard-table_row {
    font-size: 18px;

    th {
      font-weight: 400;
    }

    td.scorecard-table_row-item.score {
      font-weight: 700;

      .scorecard-table_row-item_span {
        display: block;
        margin: 0 auto;
      }

      &.double-bogey {
        .scorecard-table_row-item_span {
          border: 1px solid #fff;
          outline: 1px solid #fff;
          outline-offset: 4px;
          padding: 2px 6px;
          width: 20px;
        }
      }

      &.bogey {
        .scorecard-table_row-item_span {
          border: 1px solid #fff;
          padding: 2px 6px;
        }
      }

      &.birdie {
        .scorecard-table_row-item_span {
          border: 1px solid #fff;
          border-radius: 50%;
          padding: 2px 6px;
          height: 100%;
          margin: 0 auto;
          width: 20px;
        }
      }
    }

    &.heading {
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
