<template>
  <h1>Start a new round</h1>
  <hr />
  <p>Which course are you playing?</p>
  <select id="course-picker" v-if="courseResponse">
    <option v-for="course in courseResponse" value="">{{ course.name }}</option>
  </select>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

const courses = await fetch(`http://localhost:4000/api/courses/?holes=true`);
const courseResponse = await courses.json();
</script>

<style lang="scss" scoped></style>
