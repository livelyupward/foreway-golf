<template>
  <h1 class="course-picker_title page-title">Round Setup</h1>
  <section class="start-round step-by-step" :class="`${stageIndex === 0 ? 'active' : ''}`">
    <h2 class="start-round_container-title">Course</h2>
    <div class="start-round_container">
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
    <div class="start-round_container"></div>
  </section>
  <section class="start-round step-by-step" :class="`${stageIndex === 2 ? 'active' : ''}`">
    <h2 class="start-round_container-title">Group</h2>
    <div class="start-round_container"></div>
  </section>
  <span class="selected-course" v-if="roundConfig.courseId">{{ roundConfig.courseName }}</span>
  <Teleport to="body">
    <div v-if="courseViewerActivated" class="course-viewer">
      <div class="course-viewer_modal">
        <div class="course-viewer_container">
          <h2 class="course-viewer_modal-title">Hilldale Golf Club</h2>
          <img
            class="course-viewer_modal-hero"
            src="https://www.hilldalegolf.com/wp-content/uploads/sites/8232/2021/06/DSCF3747-1.jpg"
            alt="Picture of Hilldale Golf Club"
          />
          <div class="course-viewer_modal_button-group">
            <a href="tel:8473101100" class="course-viewer_modal_action-button call">
              <font-awesome-icon :icon="['fas', 'phone-volume']"></font-awesome-icon>
              (847) 310-1100
            </a>
            <a href="https://www.hilldalegolf.com/" target="_blank" class="course-viewer_modal_action-button website">
              <font-awesome-icon :icon="['fas', 'desktop']"></font-awesome-icon>
              Website
            </a>
          </div>
          <div class="course-viewer_modal_address-container">
            <address>1625 Ardwick Drive</address>
            <address>Hoffman Eastates, IL 60169</address>
          </div>
          <div class="course-viewer_modal_course-excerpt">
            <p>
              Hilldale Golf Club was built in 1970 on land that was once a sportsman’s club and owned by the famous
              retailer Marshall Field. Hilldale is a par 71 course that offers challenges to golfers of any kind.
              Despite your skill, you might use all the clubs in your bag. Water comes into play on 13 holes and be wary
              of the O.B. stakes. Precise shot-making and proper club selection is required. Some holes at Hilldale Golf
              Course favor a fairway wood or long iron from the tee.
            </p>
          </div>
          <button class="course-viewer_modal_select-button" @click="selectCourse">Select Course</button>
          <button class="course-viewer_modal_close-button" @click="courseViewerActivated = false">Close Info</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const courseViewerActivated = ref(false);
const stageIndex = ref(0);
const roundConfig = ref({
  courseId: undefined,
  courseName: undefined,
});

function selectCourse() {}
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
