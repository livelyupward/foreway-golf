<template>
  <div id="current-round" v-if="course && getUser">
    <h1>{{ course.name }}</h1>
    <hr />
    <CourseScorecard :holes="course.holes" />
    <n-modal v-model:show="computedScoreModal">
      <ScoreForm :course="course" :selected-hole="parseInt(+selectedHole)" />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { mainStore } from '../store';
import { NModal } from 'naive-ui';
import CourseScorecard from '../components/CourseScorecard.vue';
import ScoreForm from '../components/ScoreForm.vue';

const store = mainStore();
const { getUser, getCurrentRound, computedScoreModal } = store;

const courseFetch = await fetch(`http://localhost:4000/api/courses/${getCurrentRound.value.courseId}?holes=true`);
const course = await courseFetch.json();

const selectedHole: Ref<string | null> = ref(null);

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
</script>

<style lang="scss">
.record-score-container {
  max-width: 350px;

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
