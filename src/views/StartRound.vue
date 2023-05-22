<template>
  <h1 class="course-picker_title page-title">Round Setup</h1>
  <section class="start-round step-by-step" :class="`${stageIndex === 0 ? 'active' : ''}`">
    <h2 class="start-round_container-title">Course</h2>
    <div class="start-round_container" v-show="stageIndex === 0">
      <ul class="start-round_course-list">
        <li class="start-round_course-item">
          <span class="start-round_course-item_name">Golf Club of Illinois</span>
          <button class="start-round_course-item_button info" @click="courseViewerActivated = true">
            <font-awesome-icon :icon="['fas', 'circle-question']"></font-awesome-icon>
          </button>
          <button class="start-round_course-item_button select" @click="selectCourse">Select</button>
        </li>
        <li class="start-round_course-item">
          <span class="start-round_course-item_name">Hilldale Golf Club</span>
          <button class="start-round_course-item_button info" @click="courseViewerActivated = true">
            <font-awesome-icon :icon="['fas', 'circle-question']"></font-awesome-icon>
          </button>
          <button class="start-round_course-item_button select" @click="selectCourse">Select</button>
        </li>
        <li class="start-round_course-item">
          <span class="start-round_course-item_name">Streamwood Oaks</span>
          <button class="start-round_course-item_button info" @click="courseViewerActivated = true">
            <font-awesome-icon :icon="['fas', 'circle-question']"></font-awesome-icon>
          </button>
          <button class="start-round_course-item_button select" @click="selectCourse">Select</button>
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
    />
  </Teleport>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CourseViewer from '../components/CourseViewer.vue';

const courseViewerActivated = ref(false);
const stageIndex = ref(0);
const roundConfig: Ref<RoundSettings> = ref({
  courseId: undefined,
  courseName: undefined,
});

function selectCourse(roundConfigObject: RoundSettings): void {
  roundConfig.value.courseId = roundConfigObject.courseId;
  roundConfig.value.courseName = roundConfigObject.courseName;
  courseViewerActivated.value = false;
  ++stageIndex.value;
}

interface RoundSettings {
  courseId?: number;
  courseName?: string;
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

.course-viewer {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  display: flex;
  left: 0;
  padding: 5px;
  position: fixed;
  right: 0;
  top: 0;

  .course-viewer_modal {
    background-color: #fff;
    border-radius: 4px;
    max-height: 85%;
    overflow-y: auto;
    padding: 15px;

    .course-viewer_modal-title {
      font-size: 2rem;
      margin: 0 0 10px;
    }

    .course-viewer_modal-hero {
      border-radius: 4px;
      width: 100%;
    }

    .course-viewer_modal_button-group {
      align-items: center;
      display: flex;

      .course-viewer_modal_action-button {
        align-items: center;
        border: none;
        border-radius: 4px;
        display: flex;
        flex-basis: 50%;
        justify-content: center;
        padding: 8px 0;

        svg {
          margin-right: 6px;
        }

        &.call {
          background-color: #81c784;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          color: #333;
        }

        &.website {
          background-color: #90caf9;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          color: #333;
        }
      }
    }

    .course-viewer_modal_address-container {
      margin-top: 10px;
    }

    .course-viewer_modal_select-button,
    .course-viewer_modal_close-button {
      border-width: 1px;
      border-style: solid;
      border-radius: 4px;
      font-size: 1.125rem;
      margin-bottom: 10px;
      padding: 4px 0;
      width: 100%;
    }

    .course-viewer_modal_select-button {
      background-color: cadetblue;
      border-color: cadetblue;
      color: #fff;
    }

    .course-viewer_modal_close-button {
      background-color: #d32f2f;
      border-color: #d32f2f;
      color: #fff;
    }
  }
}
</style>
