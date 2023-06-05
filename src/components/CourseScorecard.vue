<template>
  <div id="course-scorecard" v-if="holes?.length && getCurrentCourse">
    <div class="scorecard-table_container">
      <table class="scorecard-table">
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
              @click="activateScoreFormFromScorecard(hole)"
              class="scorecard-table_row-item score"
              :class="strokeCalculate(getCurrentRound.scores[index]?.strokes, hole.par)"
            >
              <span class="scorecard-table_row-item_span">{{
                getCurrentRound.scores[index] ? getCurrentRound.scores[index].strokes : ''
              }}</span>
            </td>
          </tr>
          <tr>
            <td class="scorecard-table_row-total" colspan="2">Front</td>
            <td class="scorecard-table_row-total_par">{{ frontNineScoreTotal.frontParTotal }}</td>
            <td>{{ frontNineScoreTotal.front9Total }}</td>
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
              @click="activateScoreFormFromScorecard(hole)"
              class="scorecard-table_row-item score"
              :class="strokeCalculate(getCurrentRound.scores[index + 9]?.strokes, hole.par)"
            >
              <span class="scorecard-table_row-item_span">{{
                getCurrentRound.scores[index + 9] ? getCurrentRound.scores[index + 9].strokes : ''
              }}</span>
            </td>
          </tr>
          <tr v-if="getCurrentCourse.holeCount > 9">
            <td class="scorecard-table_row-total" colspan="2">Back</td>
            <td class="scorecard-table_row-total_par">{{ backNineScoreTotal.backParTotal }}</td>
            <td>{{ backNineScoreTotal.back9Total }}</td>
          </tr>
          <tr v-if="getCurrentCourse.holeCount > 9">
            <td class="scorecard-table_row-total final-row" colspan="2">Total</td>
            <td class="scorecard-table_row-total_par">
              {{ frontNineScoreTotal.frontParTotal + backNineScoreTotal.backParTotal }}
            </td>
            <td class="final-row">{{ roundTotal }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';
import type { Hole } from '../store';
import { computed, ComputedRef } from 'vue';

const store = mainStore();
const { getCurrentRound, getCurrentCourse } = storeToRefs(store);

const props = defineProps<HoleProp>();
const emit = defineEmits(['clickScore']);

interface HoleProp {
  holes: Array<Hole>;
}

async function activateScoreFormFromScorecard(holeFromScoreForm: object): Promise<void> {
  // console.log('scores', getCurrentRound.value.scores);
  emit('clickScore', holeFromScoreForm);
}

const strokeCalculate = (score: number | undefined, par: number) => {
  if (score === undefined) return '';
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

// console.log('Scorecard holes length: ', props.holes);

const frontNineScoreTotal: ComputedRef<Front9Total> = computed(() => {
  let frontParTotal = 0;
  let front9Total = 0;
  const front9Holes = props.holes.filter((hole, index) => index < 9);
  console.log('front array from: ', front9Holes);
  for (let i = 0; i < front9Holes.length; i++) {
    frontParTotal += front9Holes[i].par;
    if (getCurrentRound.value.scores[i] && getCurrentRound.value.scores[i].strokes !== null) {
      // @ts-ignore
      front9Total += getCurrentRound.value.scores[i].strokes;
    }
  }

  return { front9Total, frontParTotal };
});

const backNineScoreTotal: ComputedRef<Back9Total> = computed(() => {
  let backParTotal = 0;
  let back9Total = 0;
  const back9Holes = props.holes.filter((hole, index) => index > 8);
  console.log('back array from: ', back9Holes);
  for (let i = 0; i < back9Holes.length; i++) {
    backParTotal += back9Holes[i].par;
    if (getCurrentRound.value.scores[i + 9] && getCurrentRound.value.scores[i + 9].strokes !== null) {
      // @ts-ignore
      back9Total += getCurrentRound.value.scores[i + 8].strokes;
    }
  }

  return { back9Total, backParTotal };
});

const roundTotal = computed(() => frontNineScoreTotal.value.front9Total + backNineScoreTotal.value.back9Total);

interface Back9Total {
  back9Total: number;
  backParTotal: number;
}

interface Front9Total {
  front9Total: number;
  frontParTotal: number;
}
</script>

<style lang="scss">
.scorecard-table {
  @include rounded-corners;
  border-spacing: 0;
  text-align: center;
  width: 100%;

  th {
    border: 1px solid #bbb;
    border-right: none;
    border-bottom: none;

    &:last-of-type:not(:only-of-type) {
      border-right: 1px solid #bbb;
    }
  }

  td {
    border: 1px solid #bbb;
    padding: 5px 0;

    &.scorecard-table_row-total[colspan] {
      font-weight: 700;

      &.final-row {
        border-bottom: 1px solid #bbb;
      }

      & + td {
        border-bottom: none;
        font-weight: 700;

        &.final-row {
          border-bottom: 1px solid #bbb;
        }

        &.scorecard-table_row-total_par {
          border-bottom: 1px solid #bbb;
        }
      }
    }

    &.score {
      border-bottom: none;
    }

    &:not(:last-of-type) {
      border-bottom: none;
      border-right: none;
    }
  }
}

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
          border: 1px solid #333;
          outline: 1px solid #333;
          outline-offset: 2px;
          padding: 2px 6px;
          width: 20px;
        }
      }

      &.bogey {
        .scorecard-table_row-item_span {
          border: 1px solid #333;
          padding: 2px 6px;
          width: 20px;
        }
      }

      &.birdie {
        .scorecard-table_row-item_span {
          border: 1px solid #333;
          border-radius: 50%;
          padding: 2px;
          height: 100%;
          margin: 0 auto;
          width: 25px;
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
</style>
