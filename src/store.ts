import { defineStore } from 'pinia';
import { computed, ComputedRef, ref, Ref } from 'vue';
import router from './router';
import isDebug from './plugins/debugConsole';

export const mainStore = defineStore('main', () => {
  const currentRound: Ref<Round> = ref({
    courseId: null,
    userId: null,
    closed: false,
    scores: [],
  });
  const user: Ref<User | null> = ref(null);
  const drawerOpen: Ref<boolean> = ref(false);
  const currentHoleInScoreModal: Ref<number | null> = ref(null);
  const scoreModalOpen: Ref<boolean> = ref(false);
  const computedScoreModal = computed(() => {
    return scoreModalOpen.value;
  });

  const getCurrentRound: ComputedRef<Round> = computed(() => {
    return currentRound.value;
  });

  const getUser: ComputedRef<User | null> = computed(() => {
    return user.value;
  });

  const getDrawerState = computed(() => {
    return drawerOpen.value;
  });

  function closeDrawer() {
    drawerOpen.value = false;
  }

  function openDrawer() {
    drawerOpen.value = true;
  }

  function toggleDrawer() {
    return (drawerOpen.value = !drawerOpen.value);
  }

  async function openScoreModal() {
    return (scoreModalOpen.value = true);
  }
  async function closeScoreModal() {
    return (scoreModalOpen.value = false);
  }

  async function toggleScoreModal() {
    return (scoreModalOpen.value = !scoreModalOpen.value);
  }

  async function setUser(userPayload: User) {
    return (user.value = userPayload);
  }

  function resetUser() {
    return (user.value = null);
  }

  async function setHoleInScoreModal(holeNumberToSet: number) {
    return (currentHoleInScoreModal.value = holeNumberToSet);
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
    newRoundResponse.scores = [];
    currentRound.value = newRoundResponse;

    const userRoundRequest = await fetch(
      // @ts-ignore
      `http://localhost:4000/api/users/${getUser.value.id}?roundId=${newRoundResponse.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const userRoundResponse = await userRoundRequest.json();

    return { round: newRoundResponse, user: userRoundResponse };
  }

  async function goToRound(roundId: number | undefined) {
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

      const newSavedScore = await newScoreRequest.json();

      isDebug() && console.log('currentRound after submitScore() before splice:: ', currentRound.value);
      currentRound.value.scores[newSavedScore.holeId - 1] = newSavedScore;
      isDebug() && console.log('currentRound after submitScore() after splice:: ', currentRound.value);

      return newSavedScore;
    } catch (error) {
      isDebug() && console.error({ error });
    }
  }

  async function submitEditedScore(payload: Score) {
    try {
      const newScoreEditedRequest = await fetch(`http://localhost:4000/api/scores/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const newSavedEditedScore = await newScoreEditedRequest.json();

      isDebug() && console.log('currentRound after submitEditedScore() before splice:: ', currentRound.value);
      currentRound.value.scores[newSavedEditedScore.holeId - 1] = newSavedEditedScore;
      isDebug() && console.log('currentRound after submitEditedScore() after splice:: ', currentRound.value);

      return newSavedEditedScore;
    } catch (error) {
      isDebug() && console.error({ error });
    }
  }

  async function markRoundComplete() {
    // TODO: finish adding steps to completing a round or just build it
    // edit round to be complete
    // remove round id from user
  }

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
        const userDbFetch: Response = await fetch(`http://localhost:4000/api/users/${cachedTokenResponse.email}`);
        const userDbResponse: Promise<object> = await userDbFetch.json();

        // @ts-ignore
        await setUser(userDbResponse[0]);

        // @ts-ignore
        if (getUser?.value.currentRound) {
          const getRoundRequest = await fetch(`http://localhost:4000/api/round/${getUser.value.currentRound}`);
          currentRound.value = await getRoundRequest.json();
        }

        // @ts-ignore
        return userDbResponse[0];
      } catch (error) {
        localStorage.removeItem('gg_token');
        isDebug() && console.error(error);
      }
    }
  }

  return {
    computedScoreModal,
    currentHoleInScoreModal,
    getCurrentRound,
    getUser,
    getDrawerState,
    authAndGetUserFromDB,
    openScoreModal,
    closeScoreModal,
    toggleScoreModal,
    setHoleInScoreModal,
    closeDrawer,
    toggleDrawer,
    setUser,
    createNewRound,
    goToRound,
    submitScore,
    submitEditedScore,
  };
});

interface Round {
  id?: number;
  courseId: number | null;
  userId: number | null;
  closed: boolean;
  scores: Array<Score>;
}

export interface Score {
  id: number | null;
  strokes: number | null;
  putts: number | null;
  gir: boolean;
  fairway: boolean;
  roundId: number | null;
  holeId: number | null;
  userId: number | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  currentRound?: number;
  createdAt: string;
  updatedAt: string;
}
