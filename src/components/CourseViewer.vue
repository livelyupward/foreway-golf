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

<style scoped></style>
