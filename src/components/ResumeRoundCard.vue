<template>
  <section class="homepage_resume-round_wrapper" v-if="currentRoundObject">
    <div class="homepage_resume-round_container card header footer">
      <header class="homepage_resume-round_container-header">
        <h4 class="homepage_resume-round_container-header_text">@ {{ currentRoundObject.round.course.name }}</h4>
      </header>
      <div class="homepage_resume-round_container-body">
        <p>Score: {{ cumulativeRoundScore }}</p>
      </div>
      <footer class="homepage_resume-round_container-footer">
        <button class="homepage_resume-round_button" @click="resumeCurrentRound">Resume round</button>
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { mainStore } from '../store';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const props = defineProps({
  roundId: Number,
});

const router = useRouter();
const store = mainStore();
const { getUser } = storeToRefs(store);
const { getRoundById } = store;

const currentRoundObject = props.roundId ? await getRoundById(props.roundId.toString()) : null;
const cumulativeRoundScore = computed(() => {
  let totalScore = 0;

  if (!currentRoundObject) throw new Error('No open round found.');

  currentRoundObject.round.scores.forEach((scoreRow: any) => {
    if (scoreRow.strokes) {
      totalScore += scoreRow.strokes;
    }
  });

  return totalScore;
});

function resumeCurrentRound() {
  if (getUser.value) {
    router.push(`/round/${getUser.value.currentRound}`);
  }
}
</script>

<style lang="scss" scoped>
.card {
  &.header.footer {
    padding: 0;

    header {
      background-color: $primary;
      border-radius: 10px 10px 0 0;
      color: #fff;
      padding: 0.875rem;

      .homepage_resume-round_container-header_text {
        font-size: 1.125rem;
        margin: 0;
      }
    }

    .homepage_resume-round_container-body {
      padding: 0 0.875rem;
    }

    footer {
      button {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        margin: 0;
        width: 100%;
      }
    }
  }
}
</style>
