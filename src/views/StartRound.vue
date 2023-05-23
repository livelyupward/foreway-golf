<template>
  <h1 class="course-picker_title page-title">Round Setup</h1>
  <section class="start-round step-by-step" :class="`${stageIndex === 0 ? 'active' : ''}`">
    <h2 class="start-round_container-title">Course</h2>
    <div class="start-round_container" v-show="stageIndex === 0">
      <ul class="start-round_course-list">
        <li v-for="(course, index) in courses" class="start-round_course-item">
          <span class="start-round_course-item_name">{{ course.name }}</span>
          <button class="start-round_course-item_button info" @click="activateCourseViewer(index)">
            <font-awesome-icon :icon="['fas', 'circle-question']"></font-awesome-icon>
          </button>
          <button
            class="start-round_course-item_button select"
            @click="selectCourse({ courseId: course.id, courseName: course.name })"
          >
            Select
          </button>
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
      <button @click="saveOptions">Save options</button>
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
      :course-info="courseInViewer"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CourseViewer from '../components/CourseViewer.vue';

/*
StartRound component state
 */
const courseViewerActivated = ref(false);
const stageIndex = ref(0);

function selectCourse(roundConfigObject: RoundSettings): void {
  roundConfig.value.courseId = roundConfigObject.courseId;
  roundConfig.value.courseName = roundConfigObject.courseName;
  courseViewerActivated.value = false;
  ++stageIndex.value;
}

function activateCourseViewer(index: number) {
  courseInViewer.value = courses[index];
  courseViewerActivated.value = true;
}

function saveOptions() {
  ++stageIndex.value;
}

/*
Info from course needed to start round
 */
const roundConfig: Ref<RoundSettings> = ref({
  courseId: undefined,
  courseName: undefined,
});

interface RoundSettings {
  courseId?: number;
  courseName?: string;
}

/*
Temporary course data until I add in database courses
 */
const courses = [
  {
    id: 1,
    name: 'Golf Club of Illinois',
    address: '1575 Edgewood Dr',
    city: 'Algonquin',
    state: 'IL',
    zip: '60102',
    holeCount: 18,
    tees: ['red'],
    phoneNumber: '8476584400',
    webpage: 'https://golfclubofil.com/',
    courseImage: 'https://golfclubofil.com/wp-content/uploads/2021/12/20210926_085539-768x768.jpg',
    about:
      'Built in 1987 by Dick Nugent and Bruce Borland, the Golf Club of Illinois in Algonquin is a classic links-style course featuring high fescue grasses, treacherous sand bunkers, and strategically placed mounds on each hole. Early on, the course quickly developed the reputation as a stern test for all skill levels of golfers, and was consistently ranked among the top 10 public courses to play by Chicagoland Golf.',
  },
  {
    id: 4,
    name: 'Hilldale Golf Club',
    address: '1625 Ardwick Drive',
    city: 'Hoffman Estates',
    state: 'IL',
    zip: '60169',
    holeCount: 18,
    tees: ['white'],
    phoneNumber: '8473101100',
    webpage: 'https://www.hilldalegolf.com/',
    courseImage: 'https://www.pebblewoodgolf.com/golfbuffalohill/wp-content/uploads/sites/8067/2014/12/pg13.jpg?w=837',
    about:
      'Hilldale Golf Club was built in 1970 on land that was once a sportsman’s club and owned by the famous retailer Marshall Field. Hilldale is a par 71 course that offers challenges to golfers of any kind. Despite your skill, you might use all the clubs in your bag. Water comes into play on 13 holes and be wary of the O.B. stakes. Precise shot-making and proper club selection is required. Some holes at Hilldale Golf Course favor a fairway wood or long iron from the tee.',
  },
  {
    id: 2,
    name: 'Streamwood Oaks',
    address: '565 Madison Dr',
    city: 'Streamwood',
    state: 'IL',
    zip: '60107',
    holeCount: 9,
    tees: ['blue', 'white', 'red'],
    phoneNumber: '6304831881',
    webpage: 'https://streamwoodoaksgolf.com/',
    courseImage: 'https://streamwoodoaksgolf.com/wp-content/uploads/2023/03/Sunshine-9th-tee-scaled.jpg',
    about:
      'In September of 1990, Streamwood Oaks Golf Course opened for business. Streamwood Oaks is a nine-hole golf course and features a 3,404-yard championship layout. Water comes into play on all nine holes and will challenge even the most experienced player. The golf course is owned by the Village of Streamwood and operated and managed by Links Management.',
  },
];

const courseInViewer = ref();
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
