<template>
  <div id="current-round" v-if="course && getUser">
    <h1 class="current-round_title">{{ course.name }}</h1>
    <div class="current-round_info">
      <p class="current-round_info-date">Date: {{ friendlyCreatedDate }}</p>
    </div>
    <div class="current-round_invite-wrapper">
      <a class="current-round_invite-button" href="sms:123&body=hello">Invite players</a>
    </div>
    <CourseScorecard @click-score="openModalForHole" :holes="course.holes" />
    <button class="current-round_end-round" @click="closeModalIsOpen = true">Close Round</button>
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
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Hole, mainStore } from '../store';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import CourseScorecard from '../components/CourseScorecard.vue';
import ScoreForm from '../components/ScoreForm.vue';
import CloseModal from '../components/CloseModal.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = mainStore();
const { closeRound, getCourse, authAndGetUserFromDB } = store;
const { getUser, getCurrentRound } = storeToRefs(store);

if (getCurrentRound.value.courseId === undefined) await authAndGetUserFromDB();

// @ts-ignore
const { course } = await getCourse(getCurrentRound.value.courseId);

const scoreFormOpen = ref(false);
const scoreFormHoleInfo = ref();
const existingScoreOnCard = ref();
const closeModalIsOpen = ref(false);

// isDebug() && console.log('currentRound getter in current round: ', getCurrentRound.value);

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
    // message.success('Round closed successfully');
  } catch (error) {
    console.error(error);
    // message.error('Round could not be closed -- please try again');
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

function refreshScores() {
  // console.log();
}
</script>

<style lang="scss">
.current-round_title {
  margin-bottom: 0;
}

.current-round_info-date {
  margin-top: 0;
}

.current-round_invite-wrapper {
  margin-bottom: 1rem;

  .current-round_invite-button {
    @include grey-btn;
    border-radius: 10px;
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

.score-form_container,
.close-round_container {
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
