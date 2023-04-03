<template>
  <h1 class="course-picker_title">Round Setup</h1>
  <n-form>
    <n-form-item class="course-picker_input-component" label="Course" :show-feedback="false">
      <n-select v-model:value="courseIndexFromSelect" :options="courseOptions" v-if="courseResponse" />
    </n-form-item>
    <n-form-item
      v-if="courseIndexFromSelect !== null"
      class="course-picker_input-component"
      label="Tees"
      :show-feedback="false"
    >
      <n-select v-model:value="teesToPlay" :options="teesOptions" />
    </n-form-item>
  </n-form>
  <hr />
  <div class="course-picker_course-info" v-if="selectedCourse">
    <h3 class="course-picker_course-name">{{ selectedCourse.name }}</h3>
    <div class="course-picker_hero">
      <img class="course-picker_hero-image" :src="selectedCourse.courseImage" alt="" />
    </div>
    <div class="course-picker_actions">
      <n-button v-if="selectedCourse" @click="showModal = true" type="info">
        <RoundIcon class="course-picker_actions-icon" /><!-- TODO: Move Start Round to bottom of screen, fixed -->
        Start Round
      </n-button>
      <n-button tag="a" :tel="selectedCourse.phoneNumber" type="primary">
        <PhoneIcon class="course-picker_actions-icon" />
        Call </n-button
      ><!-- TODO: make call and website side by side buttons that span equal width window -->
      <n-button tag="a" strong secondary :href="selectedCourse.webpage" target="_blank" type="tertiary">
        <WebsiteIcon class="course-picker_actions-icon" />
        Website
      </n-button>
    </div>
    <address>{{ selectedCourse.address }}</address>
    <address>{{ selectedCourse.city }}, {{ selectedCourse.state }} {{ selectedCourse.zip }}</address>
    <p>Holes: {{ selectedCourse.holeCount }}</p>
  </div>
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
import { computed, ComputedRef, Ref, ref } from 'vue';
import { NForm, NSelect, NFormItem, NButton, NModal, NCard, useMessage } from 'naive-ui';
import { CallOutline as PhoneIcon } from '@vicons/ionicons5';
import { ScreenShare as WebsiteIcon, Golf as RoundIcon } from '@vicons/tabler';
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';
import isDebug from '../plugins/debugConsole';

const store = mainStore();
const { createNewRound, goToRound } = store;
const { getUser } = storeToRefs(store);
const message = useMessage();

const courses: Response = await fetch(`/api/courses`);
const courseResponse: CourseInfo[] = await courses.json();

const showModal: Ref<boolean> = ref(false);
const courseIndexFromSelect: Ref<number | undefined> = ref();
const teesToPlay: Ref<string | null> = ref(null);

const selectedCourse: ComputedRef<CourseInfo> = computed(() => {
  if (!courseIndexFromSelect.value) throw Error('Course index from select is undefined.');
  return courseResponse[courseIndexFromSelect.value];
});

const teesForSelectedCourse = computed(() => {
  return JSON.parse(selectedCourse.value.tees);
});

const courseOptions = courseResponse.map((courseItem, index) => {
  return {
    label: courseItem.name,
    value: index,
  };
});

const teesOptions = computed(() => {
  return teesForSelectedCourse.value !== null
    ? teesForSelectedCourse.value.map((tee: object) => {
        return { label: tee, value: tee };
      })
    : [];
});

async function startNewRound() {
  const startRound = await createNewRound({
    courseId: selectedCourse.value.id,
    userId: getUser.value ? getUser.value.id : null,
  });
  isDebug() && console.log('res: ', startRound);
  message.success('Round created!');
  return await goToRound(startRound.round.id);
}

interface CourseInfo {
  id: number;
  name: string;
  city: string;
  address: string;
  state: string;
  zip: string;
  holeCount: number;
  tees: string;
  phoneNumber: string;
  webpage: string;
  courseImage: string;
  createdAt: string;
  updatedAt: string;
}
</script>

<style lang="scss">
.course-picker_title {
  label {
    font-size: 2rem;
  }
}

.course-picker_hero {
  img {
    aspect-ratio: 16/5;
    object-fit: cover;
    object-position: bottom;
    max-width: 100%;
    width: 100%;
  }
}

.course-picker_actions {
  display: flex;

  @media screen and (max-width: 900px) {
    justify-content: space-between;
  }
}

.course-picker_actions-icon {
  margin-right: 5px;
}

.course-picker_label {
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
