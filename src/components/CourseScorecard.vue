<template>
  <div id="course-scorecard" v-if="holes?.length && getCurrentCourse">
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
          <tr v-for="(hole, index) in props.holes.slice(0, 9)" class="scorecard-table_row">
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
          <tr>
            <td colspan="3">Front 9 Total</td>
            <td>{{ frontNineScoreTotal }}</td>
          </tr>
          <tr
            v-if="getCurrentCourse.holeCount > 9"
            v-for="(hole, index) in props.holes.slice(9, 18)"
            class="scorecard-table_row"
          >
            <th class="scorecard-table_row-header">{{ hole.number }}</th>
            <td class="scorecard-table_row-item">{{ hole.yardage }}</td>
            <td class="scorecard-table_row-item">{{ hole.par }}</td>
            <td
              @click="activateScoreFormFromScorecard(hole.number)"
              class="scorecard-table_row-item score"
              :class="strokeCalculate(getCurrentRound.scores[index + 9]?.strokes, hole.par)"
            >
              <span class="scorecard-table_row-item_span">{{
                getCurrentRound.scores[index + 9] ? getCurrentRound.scores[index + 9].strokes : ''
              }}</span>
            </td>
          </tr>
          <tr v-if="getCurrentCourse.holeCount > 9">
            <td colspan="3">Back 9 Total</td>
            <td>{{ backNineScoreTotal }}</td>
          </tr>
          <tr v-if="getCurrentCourse.holeCount > 9">
            <td colspan="3">Round Total</td>
            <td>{{ roundTotal }}</td>
          </tr>
        </tbody>
      </n-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTable, NButton } from 'naive-ui';
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';
import type { Hole } from '../store';
import { computed, ComputedRef } from 'vue';

const store = mainStore();
const { openScoreModal, setHoleInScoreModal } = store;
const { getCurrentRound, getCurrentCourse } = storeToRefs(store);

const props = defineProps<HoleProp>();

interface HoleProp {
  holes: Array<Hole>;
}

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

const frontNineScoreTotal: ComputedRef<number> = computed(() => {
  let front9total = 0;
  const front9Holes = props.holes.filter((hole, index) => index < 9);
  console.log('front array from: ', front9Holes);
  for (let i = 0; i < front9Holes.length; i++) {
    if (getCurrentRound.value.scores[i] && getCurrentRound.value.scores[i].strokes !== null) {
      // @ts-ignore
      front9total += getCurrentRound.value.scores[i].strokes;
    }
  }

  return front9total;
});

const backNineScoreTotal: ComputedRef<number> = computed(() => {
  let back9total = 0;
  const back9Holes = props.holes.filter((hole, index) => index > 8);
  console.log('back array from: ', back9Holes);
  for (let i = 0; i < back9Holes.length; i++) {
    if (getCurrentRound.value.scores[i + 8] && getCurrentRound.value.scores[i + 8].strokes !== null) {
      // @ts-ignore
      back9total += getCurrentRound.value.scores[i + 8].strokes;
    }
  }

  return back9total;
});

const roundTotal = computed(() => frontNineScoreTotal.value + backNineScoreTotal.value);
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
          width: 20px;
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
