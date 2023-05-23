<template>
  <div class="course-viewer">
    <div class="course-viewer_modal">
      <div class="course-viewer_container">
        <h2 class="course-viewer_modal-title">{{ props.courseInfo.name }}</h2>
        <img class="course-viewer_modal-hero" :src="props.courseInfo.courseImage" />
        <div class="course-viewer_modal_button-group">
          <a :href="`tel:${props.courseInfo.phoneNumber}`" class="course-viewer_modal_action-button call">
            <font-awesome-icon :icon="['fas', 'phone-volume']"></font-awesome-icon>
            {{ props.courseInfo.phoneNumber }}
          </a>
          <a :href="props.courseInfo.webpage" target="_blank" class="course-viewer_modal_action-button website">
            <font-awesome-icon :icon="['fas', 'desktop']"></font-awesome-icon>
            Website
          </a>
        </div>
        <div class="course-viewer_modal_address-container">
          <address>{{ props.courseInfo.address }}</address>
          <address>{{ props.courseInfo.city }}, {{ props.courseInfo.state }} {{ props.courseInfo.zip }}</address>
        </div>
        <div class="course-viewer_modal_course-excerpt">
          <p>{{ props.courseInfo.about }}</p>
        </div>
        <button
          class="course-viewer_modal_select-button"
          @click="$emit('setCourse', { courseId: props.courseInfo.id, courseName: props.courseInfo.name })"
        >
          Select Course
        </button>
        <button class="course-viewer_modal_close-button" @click="$emit('closeViewer')">Close Info</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  courseInfo: CourseInfo;
}>();

interface CourseInfo {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  holeCount: number;
  tees: string[];
  phoneNumber: string;
  webpage: string;
  courseImage: string;
  about: string;
}
</script>

<style lang="scss" scoped>
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
