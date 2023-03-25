<template>
  <div id="current-round" v-if="course && getUser">
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
          <ScoreForm :course="course" :selected-hole="parseInt(selectedHole)" />
        </div>
      </n-tab-pane>
      <n-tab-pane name="view-scorecard" tab="View Scorecard">
        <CourseScorecard :holes="course.holes" />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { mainStore } from '../store';
import { NTabs, NTabPane, NSelect } from 'naive-ui';
import CourseScorecard from '../components/CourseScorecard.vue';
import ScoreForm from '../components/ScoreForm.vue';

const store = mainStore();
const { getUser, getCurrentRound } = store;

const courseFetch = await fetch(`http://localhost:4000/api/courses/${getCurrentRound.value.courseId}?holes=true`);
const course = await courseFetch.json();

const selectedHole: Ref<string> = ref('');
const newOptions = course.holes.map((hole: Hole, index: number) => {
  return {
    label: `Hole ${hole.number}`,
    key: `hole-${hole.number}-${hole.courseId}-${hole.tees}`,
    value: index,
  };
});

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
