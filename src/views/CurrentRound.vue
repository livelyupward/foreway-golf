<template>
  <h1>Golf Club of Illinois Scorecard</h1>
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
        <n-select id="hole-score-selector" v-model:value="selectedHole" :options="options" />
        <article v-if="selectedHole" class="hole-score-form">
          <n-card>
            <h3 class="score-title">Score</h3>
            <input class="score-input" type="tel" />
            <label class="score-label" for="gir"><input id="gir" class="score-checkbox" type="checkbox" />GIR</label>
            <label class="score-label" for="fh"><input id="fh" class="score-checkbox" type="checkbox" />FH</label>
            <div class="hole-score-form-info">
              <p class="hole-score-form-info-item"><span>Par: </span>3</p>
              <p class="hole-score-form-info-item"><span>Yards: </span>123</p>
              <p class="hole-score-form-info-item"><span>Handicap: </span>14</p>
            </div>
          </n-card>
          <n-button :justify="'center'" class="hole-score-form-button">Save score</n-button>
        </article>
      </div>
    </n-tab-pane>
    <n-tab-pane name="view-scorecard" tab="View Scorecard">
      <CourseScorecard />
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { NButton, NTabs, NTabPane, NSelect, NCard } from 'naive-ui';
import CourseScorecard from '../components/CourseScorecard.vue';
import { ref, Ref } from 'vue';

const selectedHole: Ref<string> = ref('');
const options: object[] = [
  {
    label: 'Hole 1',
    value: 'song0',
  },
  {
    label: 'Hole 2',
    value: 'song1',
  },
];

const holes: object[] = [
  {
    yard: 123,
    handicap: 14,
    par: 3,
    score: null,
  },
  {
    yard: 425,
    handicap: 2,
    par: 4,
    score: null,
  },
];
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
