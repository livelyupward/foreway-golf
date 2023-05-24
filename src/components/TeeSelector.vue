<template>
  <div class="tee-selector">
    <div class="tee-selector_modal">
      <div class="tee-selector_container">
        <h3 class="tee-selector_course-name">Select your teebox for {{ props.courseInfo.courseName }}</h3>
        <ul class="tee-selector_selection-container">
          <li
            v-for="tee in props.courseInfo.tees"
            class="tee-selector_selection-item"
            :class="`${selectedTeeBox === tee ? 'selected' : ''}`"
            @click="setTee(tee)"
          >
            {{ tee }}
          </li>
        </ul>
        <div class="tee-selector_button-group">
          <button class="tee-selector_button save">Save</button>
          <button class="tee-selector_button cancel" @click="$emit('closeSelector')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type TeesSettings } from '../views/StartRound.vue';

const props = defineProps<{
  courseInfo: TeesSettings;
}>();

const selectedOption = ref();

const selectedTeeBox = ref('');
function setTee(teeString: string): string {
  selectedTeeBox.value = teeString;
  return (selectedTeeBox.value = teeString);
}
</script>

<style lang="scss" scoped>
.tee-selector {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  display: flex;
  left: 0;
  padding: 5px;
  position: fixed;
  right: 0;
  top: 0;

  .tee-selector_modal {
    background-color: #fff;
    border-radius: 15px;
    margin: 0 auto;
    max-height: 85%;
    overflow-y: auto;
    padding: 15px;

    .tee-selector_course-name {
      font-size: 1.5rem;
      line-height: 1.5;
      margin-top: 0;
    }

    .tee-selector_selection-container {
      border-radius: 15px;
      list-style-type: none;
      padding-left: 0;

      li {
        border: 1px solid #ddd;
        border-bottom: none;
        padding: 15px 8px;
        text-transform: capitalize;

        &.selected {
          background-color: #888;
          color: #fff;
        }

        &:first-of-type {
          border-top-right-radius: 15px;
          border-top-left-radius: 15px;
        }

        &:last-of-type {
          border-bottom: 1px solid #ddd;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
          margin-bottom: 0;
        }
      }
    }

    .tee-selector_button {
      color: #fff;
      font-size: 1rem;
      margin: 0 10px;
      padding: 8px 15px;

      &:first-of-type {
        margin-left: 0;
      }

      &:last-of-type {
        margin-right: 0;
      }

      &.save {
        background-color: cadetblue;
        border: 1px solid cadetblue;
      }

      &.cancel {
        background-color: #d32f2f;
        border: 1px solid #d32f2f;
      }
    }
  }
}
</style>
