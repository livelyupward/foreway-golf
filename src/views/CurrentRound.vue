<template>
  <div id="current-round" v-if="course && getUser">
    <h1 class="current-round_title">{{ course.name }}</h1>
    <div class="current-round_info">
      <p class="current-round_info-date">Round Date: {{ friendlyCreatedDate }}</p>
    </div>
    <div class="current-round_invite-wrapper">
      <!--      <a class="current-round_invite-button" href="sms:123&body=hello">Invite players</a>-->
    </div>
    <CourseScorecard @click-score="openModalForHole" :holes="course.holes" />
    <button class="current-round_end-round" @click="closeModalIsOpen = true">End & Submit Round</button>
    <button class="current-round_cancel-round" @click="deleteRoundModalIsOpen = true">Delete Round</button>
    <Teleport to="body">
      <ScoreForm
        v-if="scoreFormOpen && scoreFormHoleInfo"
        :course="course"
        :selected-hole="scoreFormHoleInfo"
        :existing-score="existingScoreOnCard ? existingScoreOnCard : undefined"
        @close-form="closeModalWithButton"
        @score-submitted="closeModalWithButton"
      />
      <CloseModal :is-closing="closeModalIsOpen" @close-round="endRound" @close-modal="closeModalIsOpen = false" />
      <DeleteRoundModal
        :is-closing="deleteRoundModalIsOpen"
        @delete-round="deleteRound"
        @close-modal="deleteRoundModalIsOpen = false"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { Hole, mainStore, type MiddleMan } from '../store';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import CourseScorecard from '../components/scores/CourseScorecard.vue';
import ScoreForm from '../components/scores/ScoreForm.vue';
import CloseModal from '../components/rounds/CloseRoundModal.vue';
import DeleteRoundModal from '../components/rounds/DeleteRoundModal.vue';

const router = useRouter();
const store = mainStore();
const { closeRound, deleteRoundFromScorecard, getCourse, authAndGetUserFromDB } = store;
const { getUser, getCurrentRound } = storeToRefs(store);

const message = inject('message') as MiddleMan;

if (getCurrentRound.value.courseId === undefined) await authAndGetUserFromDB();

// @ts-ignore
const { course } = await getCourse(getCurrentRound.value.courseId);

const scoreFormOpen = ref(false);
const scoreFormHoleInfo = ref();
const existingScoreOnCard = ref();
const closeModalIsOpen = ref(false);
const deleteRoundModalIsOpen = ref(false);

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
    await router.push('/');
    message.success('Round closed successfully');
  } catch (error) {
    console.error(error);
    message.reject('Round could not be closed. Please try again');
  }
}

async function deleteRound() {
  try {
    await deleteRoundFromScorecard();
    await router.push('/');
    message.success('Round deleted successfully');
  } catch (error) {
    console.error(error);
    message.reject('Round could not be deleted. Please try again');
  }
}

function openModalForHole(holeFromScoreForm: Hole) {
  if (getCurrentRound.value.scores[holeFromScoreForm.number - 1]) {
    existingScoreOnCard.value = getCurrentRound.value.scores[holeFromScoreForm.number - 1];
  }

  scoreFormHoleInfo.value = holeFromScoreForm;
  scoreFormOpen.value = true;
}

function closeModalWithButton() {
  existingScoreOnCard.value = undefined;
  scoreFormHoleInfo.value = undefined;
  scoreFormOpen.value = false;
}
</script>

<style lang="scss">
.current-round_title {
  margin-bottom: 0;
}

.current-round_info-date {
  margin-top: 0.375rem;
}

.current-round_invite-wrapper {
  margin-bottom: 1rem;

  .current-round_invite-button {
    @include grey-btn;
    box-sizing: border-box;
    display: block;
    padding: 6px 12px;
    text-align: center;
    text-decoration: none;
    width: 100%;
  }
}

.record-score-container {
  max-width: 350px;

  .score-input {
    border: 1px solid #ddd;
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
  @include blue-btn;
  display: block;
  margin-top: 15px;
  text-align: center;
  width: 100%;

  span {
    justify-content: center;
  }
}

.current-round_cancel-round {
  @include red-btn;
  display: block;
  margin-top: 15px;
  text-align: center;
  width: 100%;
}
</style>
