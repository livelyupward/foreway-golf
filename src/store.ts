import { defineStore } from 'pinia';
import { computed, ref, Ref } from 'vue';
import { router } from './router';

export const mainStore = defineStore('main', () => {
  const currentRound: Ref<number | null> = ref(null);
  const user: Ref<object | null> = ref(null);
  const drawerOpen: Ref<boolean> = ref(false);

  const getCurrentRound = computed(() => {
    return currentRound;
  });

  const getUser = computed(() => {
    return user;
  });

  const getDrawerState = computed(() => {
    return drawerOpen;
  });

  function closeDrawer() {
    drawerOpen.value = false;
  }

  function openDrawer() {
    drawerOpen.value = true;
  }

  function toggleDrawer() {
    drawerOpen.value = !drawerOpen.value;
  }

  function setUser(userPayload: object) {
    return (user.value = userPayload);
  }

  function resetUser() {
    return (user.value = null);
  }

  async function createNewRound(courseInfoObject: object) {
    const newRoundRequest = await fetch(`http://localhost:4000/api/round/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseInfoObject),
    });

    const newRoundResponse = await newRoundRequest.json();
    currentRound.value = newRoundResponse;

    return newRoundResponse;
  }

  async function goToRound(roundId: number) {
    return await router.push(`/rounds/${roundId}`);
  }

  return {
    getCurrentRound,
    getUser,
    getDrawerState,
    closeDrawer,
    openDrawer,
    toggleDrawer,
    setUser,
    createNewRound,
    goToRound,
    resetUser,
  };
});
