<template>
  <div id="current-round" v-if="course && getUser">
    <h1 class="current-round_title">{{ course.name }}</h1>
    <div class="current-round_info">
      <p class="current-round_info-date">Date: {{ friendlyCreatedDate }}</p>
    </div>
    <CourseScorecard @click-score="openModalForHole" :holes="course.holes" />
    <button class="current-round_end-round" @click="endRound">Close Round</button>
    <Teleport to="body">
      <ScoreForm
        v-if="scoreFormOpen && holeNumberForScoreForm"
        :course="course"
        :selected-hole="holeNumberForScoreForm"
        @close-form="scoreFormOpen = false"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { mainStore } from '../store';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import isDebug from '../plugins/debugConsole';
import CourseScorecard from '../components/CourseScorecard.vue';
import ScoreForm from '../components/ScoreForm.vue';

const store = mainStore();
const { closeScoreModal, closeRound, getCourse } = store;
const { getUser, getCurrentRound, currentHoleInScoreModal } = storeToRefs(store);

const scoreFormOpen = ref(false);
const holeNumberForScoreForm = ref();

isDebug() && console.log('currentRound getter in current round: ', getCurrentRound.value);

// @ts-ignore
const { course } = await getCourse(getCurrentRound.value.courseId);

const friendlyCreatedDate = computed(() => {
  // @ts-ignore
  const dateString: string | undefined = course.createdAt;
  const date: Date | null = dateString ? new Date(dateString) : null;
  const options = { timeZone: 'UTC' };

  return date ? date.toLocaleDateString('en-US', options) : null;
});

async function endRound() {
  try {
    await closeRound();
    // message.success('Round closed successfully');
  } catch (error) {
    console.error(error);
    // message.error('Round could not be closed -- please try again');
  }
}

function openModalForHole(holeNumberAndId: object) {
  console.log('passing hole number ', holeNumberAndId);
  holeNumberForScoreForm.value = holeNumberAndId;
  scoreFormOpen.value = true;
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

.current-round_end-round {
  @include red-btn;
  display: block;
  margin-top: 15px;
  text-align: center;
  width: 100%;

  span {
    justify-content: center;
  }
}

.score-form_container {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
  bottom: 0;
  display: flex;
  left: 0;
  padding: 10px;
  position: fixed;
  right: 0;
  top: 0;
}
</style>
