<template>
  <h1 class="course-picker_title page-title">Round Setup</h1>
  <section class="start-round step-by-step" :class="`${stageIndex === 0 ? 'active' : ''}`">
    <h2 class="start-round_container-title">Course</h2>
    <div class="start-round_container" v-show="stageIndex === 0">
      <ul class="start-round_course-list">
        <li v-for="(course, index) in courses" class="start-round_course-item">
          <span class="start-round_course-item_name">{{ course.name }}</span>
          <button class="start-round_course-item_button info" @click="activateCourseViewer(index)">
            <font-awesome-icon :icon="['fas', 'circle-question']"></font-awesome-icon>
          </button>
          <button
            class="start-round_course-item_button select"
            @click="selectCourse({ courseId: course.id, courseName: course.name })"
          >
            Select
          </button>
        </li>
      </ul>
    </div>
  </section>
  <section class="start-round step-by-step" :class="`${stageIndex === 1 ? 'active' : ''}`">
    <h2 class="start-round_container-title">Options</h2>
    <div class="start-round_container" v-show="stageIndex === 1">
      <ul class="start-round_options-list">
        <li class="start-round_options-item">Option 1</li>
        <li class="start-round_options-item">Option 2</li>
        <li class="start-round_options-item">Option 3</li>
      </ul>
      <button @click="saveOptions">Save options</button>
    </div>
  </section>
  <section class="start-round step-by-step" :class="`${stageIndex === 2 ? 'active' : ''}`">
    <h2 class="start-round_container-title">Group</h2>
    <div class="start-round_container" v-show="stageIndex === 2"></div>
  </section>
  <span class="selected-course" v-if="roundConfig.courseId">{{ roundConfig.courseName }}</span>
  <Teleport to="body">
    <CourseViewer
      v-if="courseViewerActivated"
      @set-course="selectCourse"
      @close-viewer="courseViewerActivated = false"
      :course-info="courseInViewer"
    />
  </Teleport>
  <Teleport to="body">
    <TeeSelector v-if="teeSelectorActivated && teesConfig.courseName" :course-info="teesConfig"></TeeSelector>
  </Teleport>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CourseViewer from '../components/CourseViewer.vue';
import courses from '../../public/courses.json';
import TeeSelector from '../components/TeeSelector.vue';

/*
StartRound component state
 */
const stageIndex = ref(0);
const courseViewerActivated = ref(false);
const courseInViewer = ref();
const teeSelectorActivated = ref(false);

function selectCourse(roundConfigObject: RoundSettings): void {
  roundConfig.value.courseId = roundConfigObject.courseId;
  roundConfig.value.courseName = roundConfigObject.courseName;
  teesConfig.value.courseName = courseInViewer.value.name; // TODO: Fix error
  teesConfig.value.tees = courseInViewer.value.tees;
  courseViewerActivated.value = false;
  teeSelectorActivated.value = true;
}

function activateCourseViewer(index: number) {
  courseInViewer.value = courses[index];
  courseViewerActivated.value = true;
}

function saveOptions() {
  ++stageIndex.value;
}

/*
Info from course needed to start round
 */
const roundConfig: Ref<RoundSettings> = ref({
  courseId: undefined,
  courseName: undefined,
});

const teesConfig: Ref<TeesSettings> = ref({
  courseName: undefined,
  tees: [],
});

interface RoundSettings {
  courseId?: number;
  courseName?: string;
}

export interface TeesSettings {
  courseName?: string;
  tees?: string[];
}
</script>

<style lang="scss">
.step-by-step {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 8px;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.start-round {
  color: #aaa;

  .start-round_container-title {
    font-size: 1.75rem;
    margin: 0;

    & ~ .start-round_container.active {
      margin-top: 10px;
    }
  }

  &.active {
    color: inherit;
  }

  .start-round_course-list {
    list-style-type: none;
    margin-bottom: 0;
    padding-left: 0;

    .start-round_course-item {
      align-items: center;
      border-bottom: 1px solid #ddd;
      display: flex;
      font-size: 1.125rem;
      justify-content: space-between;
      padding: 0 0 10px;
      margin: 10px 0 0;

      &:last-of-type {
        border-bottom: none;
        padding-bottom: 0;
      }

      .start-round_course-item_button {
        &:first-of-type {
          margin-left: auto;
          margin-right: 10px;
        }
      }
    }

    .start-round_course-item_button {
      font-size: 1rem;

      &.info {
        background-color: rgba(0, 0, 0, 0);
        border: none;
        color: #2196f3;
      }

      &.select {
        background-color: #38853a;
        border: 1px solid #38853a;
        color: #fff;
      }
    }
  }
}
</style>
