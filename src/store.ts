import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';

export const mainStore = defineStore('main', () => {
  const currentRound: Ref<number | null> = ref(null);
  const user: Ref<object | null> = ref(null);
});
