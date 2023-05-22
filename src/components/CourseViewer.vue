<template>
  <div class="course-viewer">
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
          <address>Hoffman Estates, IL 60169</address>
        </div>
        <div class="course-viewer_modal_course-excerpt">
          <p>
            Hilldale Golf Club was built in 1970 on land that was once a sportsman’s club and owned by the famous
            retailer Marshall Field. Hilldale is a par 71 course that offers challenges to golfers of any kind. Despite
            your skill, you might use all the clubs in your bag. Water comes into play on 13 holes and be wary of the
            O.B. stakes. Precise shot-making and proper club selection is required. Some holes at Hilldale Golf Course
            favor a fairway wood or long iron from the tee.
          </p>
        </div>
        <button
          class="course-viewer_modal_select-button"
          @click="$emit('setCourse', { courseId: 1, courseName: 'Hilldale Golf Club' })"
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
</script>

<style scoped></style>
