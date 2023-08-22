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
            <font-awesome-icon :class="tee" :icon="['fas', 'golf-ball-tee']" />
          </li>
        </ul>
        <div class="tee-selector_button-group">
          <button
            class="tee-selector_button save"
            @click="$emit('saveTeeAndClose', selectedTeeBox)"
            :disabled="!selectedTeeBox"
          >
            Save
          </button>
          <button class="tee-selector_button cancel" @click="$emit('closeSelector')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  courseInfo: Course;
}>();
const emit = defineEmits(['closeSelector', 'saveTeeAndClose']);

const selectedOption = ref();

const selectedTeeBox = ref();
function setTee(teeString: string): void {
  selectedTeeBox.value = teeString;
  selectedTeeBox.value = teeString;
}

interface Course {
  courseName: string;
  courseId: number;
  tees: string[];
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
      list-style-type: none;
      padding-left: 0;

      li {
        align-items: center;
        border: 1px solid #ddd;
        border-bottom: none;
        display: flex;
        font-size: 1.125rem;
        justify-content: space-between;
        padding: 15px 8px;
        text-transform: capitalize;

        .fa-golf-ball-tee {
          filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.75));
          font-size: 2rem;

          &.black {
            color: #333;
          }

          &.white {
            color: #fff;
          }

          &.blue {
            color: #00f;
          }

          &.red {
            color: #f00;
          }

          &.yellow {
            color: #ffee58;
          }

          &.gold {
            color: #ffd54f;
          }
        }

        &.selected {
          background-color: #ccc;
          color: #333;
          font-weight: 700;
        }

        &:last-of-type {
          border-bottom: 1px solid #ddd;
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
        background-color: $primary;
        border: 1px solid $primary;

        &:disabled {
          background-color: #dddddd;
          border-color: #dddddd;
          color: #888888;
        }
      }

      &.cancel {
        @include red-btn;
        //background-color: #d32f2f;
        //border: 1px solid #d32f2f;
      }
    }
  }
}
</style>
