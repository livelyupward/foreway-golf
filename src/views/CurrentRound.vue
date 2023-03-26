<template>
  <div id="current-round" v-if="course && getUser">
    <h1 class="current-round_title">{{ course.name }}</h1>
    <div class="current-round_info">
      <p class="current-round_info-date">Date: {{ friendlyCreatedDate }}</p>
    </div>
    <CourseScorecard :holes="course.holes" />
    <n-modal v-model:show="computedScoreModal" @update:show="toggleScoreModal">
      <n-card
        style="width: 600px"
        :title="`Hole ${currentHoleInScoreModal}`"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header-extra>
          <CloseIcon @click="closeScoreModal" />
        </template>
        <ScoreForm :course="course" :selected-hole="currentHoleInScoreModal" />
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { mainStore } from '../store';
import { NModal, NCard } from 'naive-ui';
import { CloseSharp as CloseIcon } from '@vicons/ionicons5';
import CourseScorecard from '../components/CourseScorecard.vue';
import ScoreForm from '../components/ScoreForm.vue';
import { storeToRefs } from 'pinia';
import isDebug from '../plugins/debugConsole';
import { computed } from 'vue';

const store = mainStore();
const { toggleScoreModal, closeScoreModal } = store;
const { getUser, getCurrentRound, computedScoreModal, currentHoleInScoreModal } = storeToRefs(store);

isDebug() && console.log('currentRound getter in current round: ', getCurrentRound.value);

const courseFetch = await fetch(`http://localhost:4000/api/courses/${getCurrentRound.value.courseId}?holes=true`);
const course = await courseFetch.json();

const friendlyCreatedDate = computed(() => {
  const dateString = course.createdAt;
  const date = new Date(dateString);
  const options = { timeZone: 'UTC' };

  return date.toLocaleDateString('en-US', options);
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
</script>

<style lang="scss">
.current-round_title {
  margin-bottom: 0;
}

.current-round_info-date {
  margin-top: 0;
}

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
