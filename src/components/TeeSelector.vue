<template>
  <div class="tee-selector">
    <div class="tee-selector_modal">
      <div class="tee-selector_container">
        <h3 class="tee-selector_course-name">{{ props.courseInfo.courseName }}</h3>
        <ul class="tee-selector_selection-container">
          <li v-for="tee in props.courseInfo.tees" class="tee-selector_selection-item" @click="setTee(tee)">
            {{ tee }}
          </li>
        </ul>
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

const selectedTeeBox = ref('');
function setTee(teeString: string): string {
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
    border-radius: 4px;
    max-height: 85%;
    overflow-y: auto;
    padding: 15px;

    .tee-selector_modal-title {
      font-size: 2rem;
      margin: 0 0 10px;
    }

    .tee-selector_modal-hero {
      border-radius: 4px;
      width: 100%;
    }

    .tee-selector_modal_button-group {
      align-items: center;
      display: flex;

      .tee-selector_modal_action-button {
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

    .tee-selector_modal_address-container {
      margin-top: 10px;
    }

    .tee-selector_modal_select-button,
    .tee-selector_modal_close-button {
      border-width: 1px;
      border-style: solid;
      border-radius: 4px;
      font-size: 1.125rem;
      margin-bottom: 10px;
      padding: 4px 0;
      width: 100%;
    }

    .tee-selector_modal_select-button {
      background-color: cadetblue;
      border-color: cadetblue;
      color: #fff;
    }

    .tee-selector_modal_close-button {
      background-color: #d32f2f;
      border-color: #d32f2f;
      color: #fff;
    }
  }
}
</style>
