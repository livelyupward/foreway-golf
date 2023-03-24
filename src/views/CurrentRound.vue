<template>
  <h1>{{ course.name }}</h1>
  <hr />
  <n-tabs
    class="card-tabs"
    default-value="record-hole"
    size="large"
    animated
    style="margin: 0 -4px"
    pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
  >
    <n-tab-pane name="record-hole" tab="Record Hole">
      <div class="record-hole-container">
        <n-select id="hole-score-selector" v-model:value="selectedHole" :options="newOptions" />
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
            <div class="hole-score-form-info">
              <p class="hole-score-form-info-item"><span>Par: </span>{{ getHoleFromSelect.par }}</p>
              <p class="hole-score-form-info-item"><span>Yards: </span>{{ getHoleFromSelect.yardage }}</p>
              <p class="hole-score-form-info-item"><span>Handicap: </span>{{ getHoleFromSelect.handicap }}</p>
            </div>
          </n-card>
          <n-button attr-type="submit" :justify="'center'" class="hole-score-form-button">Save score</n-button>
        </form>
      </div>
    </n-tab-pane>
    <n-tab-pane name="view-scorecard" tab="View Scorecard">
      <CourseScorecard :holes="course.holes" />
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { NButton, NTabs, NTabPane, NSelect, NCard } from 'naive-ui';
import CourseScorecard from '../components/CourseScorecard.vue';
import { computed, ref, Ref } from 'vue';
import { mainStore } from '../store';

const store = mainStore();
const { submitScore } = store;

const courseFetch = await fetch(`http://localhost:4000/api/courses/${store.getCurrentRound.value.courseId}?holes=true`);
const course = await courseFetch.json();

const selectedHole: Ref<string> = ref('');
const newOptions = course.holes.map((hole: Hole, index: number) => {
  return {
    label: `Hole ${hole.number}`,
    key: `hole-${hole.number}-${hole.courseId}-${hole.tees}`,
    value: index,
  };
});

const getHoleFromSelect = computed(() => {
  return course.holes[parseInt(selectedHole.value)];
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

    return newScore;
  } else {
    console.error('Error: please provide a hole, a round, and a user id.');
  }
}

interface Hole {
  id: number;
  number: number;
  yardage: number;
  par: number;
  tees: string;
  handicap: number;
  courseId: number;
  createdAt: string;
  updatedAt: string;
}

interface Score {
  strokes: number | null;
  gir: boolean;
  fairway: boolean;
  roundId: number | null;
  holeId: number | null;
  userId: number | null;
}
</script>

<style lang="scss">
.record-hole-container {
  max-width: 350px;

  .score-title {
    color: #3d5afe;
    font-size: 48px;
    line-height: 1.25;
    margin-bottom: 10px;
    margin-top: 0;
    text-align: center;
  }

  .score-title-hole {
    display: block;
  }

  .score-input {
    border: 1px solid #ddd;
    border-radius: 6px;
    box-sizing: border-box;
    display: block;
    font-size: 48px;
    margin: 0 auto 10px;
    max-width: 100%;
    padding: 10px;
    text-align: center;
    width: 120px;
  }
}

.n-base-selection-input__content {
  font-size: 16px;
}

.hole-score-form {
  margin: 20px 0;
  text-align: center;

  .score-label {
    cursor: pointer;
    margin: 0 10px;
  }

  .score-checkbox {
    cursor: pointer;
    margin: 0 6px;
  }

  .n-button .n-button__content {
    justify-content: center;
  }

  .hole-score-form-button {
    display: block;
    font-size: 18px;
    margin-top: 20px;
    width: 100%;
  }
}

.hole-score-form-info {
  border-top: 1px solid #ddd;
  justify-content: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 10px;

  .hole-score-form-info-item {
    margin: 0.5em;

    span {
      font-weight: 700;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
