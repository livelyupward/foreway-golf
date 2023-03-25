import { defineStore } from 'pinia';
import { computed, ref, Ref } from 'vue';
import router from './router';

export const mainStore = defineStore('main', () => {
  const currentRound: Ref<Round> = ref({
    courseId: null,
    userId: null,
    scores: new Map(),
  });
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
    newRoundResponse.scores = new Map();
    currentRound.value = newRoundResponse;

    return newRoundResponse;
  }

  async function goToRound(roundId: number) {
    return await router.push(`/rounds/${roundId}`);
  }

  async function submitScore(payload: Score) {
    try {
      const newScoreRequest = await fetch(`http://localhost:4000/api/scores/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('ROUND:: ', currentRound);
      const newSavedScore = await newScoreRequest.json();

      // TODO: check if attempt to remove holeId from object is working. next move is to make sure scores are showing in current round.
      currentRound.value.scores.set(newSavedScore.holeId, newSavedScore);

      return newSavedScore;
    } catch (error) {
      console.error({ error });
    }
  }
  // TODO: continue refactor of auth into store. was previously handled on load in Home.vue
  async function authAndGetUserFromDB() {
    // if token is saved in DB
    if (localStorage.getItem('gg_token')) {
      try {
        /**
         * send cached token to Google auth
         */
        const cachedTokenSend = await fetch(`http://localhost:4000/auth?cred=${localStorage.getItem('gg_token')}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (cachedTokenSend.status === 403) {
          localStorage.removeItem('gg_token');
          resetUser();
          await router.push('/auth');
        }

        const cachedTokenResponse = await cachedTokenSend.json();
        const userDbFetch = await fetch(`http://localhost:4000/api/users/${cachedTokenResponse.email}`);
        const userDbResponse: object[] = await userDbFetch.json();

        setUser(userDbResponse[0]);
      } catch (error) {
        localStorage.removeItem('gg_token');
        console.error(error);
      }
    }
  }

  return {
    authAndGetUserFromDB,
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
    submitScore,
  };
});

interface Round {
  courseId: number | null;
  userId: number | null;
  scores: Map<number, Score>;
}

interface Score {
  strokes: number | null;
  gir: boolean;
  fairway: boolean;
  roundId: number | null;
  holeId: number | null;
  userId: number | null;
}
