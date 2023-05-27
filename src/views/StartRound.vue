<template>
  <h1 class="course-picker_title page-title">Round Setup</h1>
  <span class="selected-course" v-if="roundConfig.courseId">
    <span v-if="roundConfig.courseName && roundConfig.tees" class="selected-course_tee-name">{{
      roundConfig.tees ? roundConfig.tees : null
    }}</span>
    tees at
    {{ roundConfig.courseName }}
  </span>
  <section class="start-round step-by-step" :class="`${stageIndex === 0 ? 'active' : ''}`">
    <h2 class="start-round_container-title">Course</h2>
    <div class="start-round_container" v-show="stageIndex === 0">
      <ul class="start-round_course-list">
        <li v-for="(course, index) in courses" class="start-round_course-item">
          <span class="start-round_course-item_name">{{ course.name }}</span>
          <button class="start-round_course-item_button info" @click="activateCourseViewer(index)">
            <font-awesome-icon :icon="['fas', 'circle-question']"></font-awesome-icon>
          </button>
          <button class="start-round_course-item_button select" @click="selectCourse(index)">Select</button>
        </li>
      </ul>
    </div>
  </section>
  <!--  <section class="start-round step-by-step" :class="`${stageIndex === 1 ? 'active' : ''}`">-->
  <!--    <h2 class="start-round_container-title">Options</h2>-->
  <!--    <div class="start-round_container" v-show="stageIndex === 1">-->
  <!--      <ul class="start-round_options-list">-->
  <!--        <li class="start-round_options-item">Option 1</li>-->
  <!--        <li class="start-round_options-item">Option 2</li>-->
  <!--        <li class="start-round_options-item">Option 3</li>-->
  <!--      </ul>-->
  <!--      <button @click="saveOptions">Save options</button>-->
  <!--    </div>-->
  <!--  </section>-->
  <!--  <section class="start-round step-by-step" :class="`${stageIndex === 2 ? 'active' : ''}`">-->
  <!--    <h2 class="start-round_container-title">Group</h2>-->
  <!--    <div class="start-round_container" v-show="stageIndex === 2"></div>-->
  <!--  </section>-->
  <button
    v-if="getUser && roundConfig.courseId && roundConfig.courseName"
    @click="submitNewRoundRequest({ ...roundConfig, userId: getUser.id })"
  >
    Start Round
  </button>
  <Teleport to="body">
    <CourseViewer
      v-if="courseViewerActivated"
      @set-course="selectCourse"
      @close-viewer="courseViewerActivated = false"
      :course-info="activeCourse"
    />
  </Teleport>
  <Teleport to="body">
    <TeeSelector
      v-if="teeSelectorActivated && roundConfig.courseName"
      :course-info="activeCourse"
      @close-selector="closeModals"
      @save-tee-and-close="setTeeFromModal"
    ></TeeSelector>
  </Teleport>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { mainStore } from '../store';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { type RoundSettings } from '../store';
import courses from '../assets/courses.json';
import CourseViewer from '../components/CourseViewer.vue';
import TeeSelector from '../components/TeeSelector.vue';

const router = useRouter();
const route = useRoute();
const store = mainStore();
const { createNewRound } = store;
const { getUser } = storeToRefs(store);

/*
StartRound component state
 */
const activeCourse = ref();
const stageIndex = ref(0);
const courseViewerActivated = ref(false);
const courseInViewer = ref();
const teeSelectorActivated = ref(false);

function selectCourse(index: number): void {
  const courseSelected = courseInViewer.value || courses[index];

  activeCourse.value = {
    courseName: courseSelected.name,
    courseId: courseSelected.id,
    tees: courseSelected.tees,
  };
  roundConfig.value = {
    ...roundConfig.value,
    courseId: courseSelected.id,
    courseName: courseSelected.name,
  };
  courseViewerActivated.value = false;
  teeSelectorActivated.value = true;
}

function activateCourseViewer(index: number) {
  activeCourse.value = courses[index];
  courseInViewer.value = courses[index];
  courseViewerActivated.value = true;
}

function saveOptions() {
  ++stageIndex.value;
}

function setTeeFromModal(teeBox: string): void {
  roundConfig.value.tees = teeBox;
  saveOptions();
  courseViewerActivated.value = false;
  teeSelectorActivated.value = false;
}

function closeModals() {
  roundConfig.value = { courseId: undefined, courseName: undefined };
  courseViewerActivated.value = false;
  teeSelectorActivated.value = false;
}

async function submitNewRoundRequest(roundConfig: RoundSettings) {
  const newRoundResponse = await createNewRound(roundConfig);

  if (newRoundResponse.errors) return 'errors were found';

  return router.push(`/rounds/${newRoundResponse.round.id}`);
}

/*
Info from course needed to start round
 */
const roundConfig: Ref<RoundSettings> = ref({
  courseId: undefined,
  courseName: undefined,
  tees: undefined,
});
</script>

<style lang="scss">
.course-picker_title {
  margin-bottom: 15px;
}

.step-by-step {
  background-color: #fff;
  border: 1px solid #ddd;
  @include rounded-corners;
  margin-bottom: 15px;
  padding: 10px;
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

        &:last-of-type {
          @include sm-shadow;
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
        background-color: $green;
        border: 1px solid $green;
        color: #fff;
      }
    }
  }
}

.selected-course {
  background-color: #fff;
  border: 1px solid #ddd;
  @include rounded-corners;
  display: block;
  font-weight: 700;
  margin-bottom: 15px;
  padding: 15px;
  text-align: center;
}
.selected-course_tee-name {
  text-transform: capitalize;
}
</style>
