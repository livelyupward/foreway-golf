<template>
  <h1>Start a new round</h1>
  <hr />
  <label class="course-picker-label" for="course-picker">Select a course</label>
  <select id="course-picker" v-model="selectedCourse" v-if="courseResponse">
    <option v-for="course in courseResponse" :value="course">{{ course.name }}</option>
  </select>
  <div v-if="selectedCourse">
    <p>City: {{ selectedCourse.city }}</p>
    <p>Holes: {{ selectedCourse.holeCount }}</p>
  </div>
  <n-button v-if="selectedCourse" @click="showModal = true">Start Round</n-button>
  <n-modal v-model:show="showModal">
    <n-card
      class="start-modal-card"
      style="width: 600px"
      title="Are you sure?"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      Start a round at {{ selectedCourse.name }}?
      <template #footer>
        <n-button @click="showModal = false" type="error">Cancel</n-button>
        <n-button @click="startNewRound" type="success">Start</n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { NButton, NModal, NCard } from 'naive-ui';
import { mainStore } from '../store';

const store = mainStore();
const { getUser, createNewRound, goToRound } = store;

const selectedCourse: Ref<CourseInfo | null> = ref(null);
const showModal: Ref<boolean> = ref(false);
const courseInfoToSend: Ref<object> = ref({
  userId: getUser.value ? getUser.value.id : '',
  courseId: selectedCourse.value ? selectedCourse.value.id : '',
});

const courses: Response = await fetch(`http://localhost:4000/api/courses`);
const courseResponse: object[] = await courses.json();

async function startNewRound() {
  const startRound = await createNewRound({
    courseId: selectedCourse.value.id,
    userId: getUser.value.id,
  });
  console.log('res: ', startRound);
  return await goToRound(startRound.id);
}

interface CourseInfo {
  id: number;
  name: string;
  city: string;
  state: string;
  holeCount: number;
  createdAt: string;
  updatedAt: string;
}
</script>

<style lang="scss">
.course-picker-label {
  font-size: 18px;
}

#course-picker {
  border: 1px solid #bbb;
  border-radius: 4px;
  font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 18px;
  margin: 10px 0;
  padding: 4px;
  width: 100%;

  option {
    border-radius: 0;
  }
}

.start-modal-card {
  font-size: 18px;

  .n-button {
    .n-button__content {
      font-size: 18px;
    }

    &:first-of-type {
      margin-right: 15px;
    }
  }
}
</style>
